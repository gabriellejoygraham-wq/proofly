import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import axios from 'axios';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Brave Search function
async function searchClaim(query) {
  if (!process.env.BRAVE_API_KEY) {
    console.log('No Brave API key - skipping search');
    return [];
  }

  try {
    const response = await axios.get('https://api.search.brave.com/res/v1/web/search', {
      headers: {
        'Accept': 'application/json',
        'X-Subscription-Token': process.env.BRAVE_API_KEY
      },
      params: {
        q: query,
        count: 5
      }
    });

    return response.data.web?.results || [];
  } catch (error) {
    console.error('Search error:', error.message);
    return [];
  }
}

export async function POST(request) {
  try {
    const { text } = await request.json();

    if (!text || text.trim().length < 10) {
      return NextResponse.json(
        { error: 'Text too short' },
        { status: 400 }
      );
    }

    // Step 1: Extract claims using Claude
    const claimExtractionPrompt = `Extract 3-8 specific, verifiable claims from this text. Return ONLY a JSON array of claims, no explanation.

Text: "${text}"

Example format: ["claim 1", "claim 2", "claim 3"]`;

    const extractionResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: claimExtractionPrompt
      }]
    });

    let claimsText = extractionResponse.content[0].text.trim();
    claimsText = claimsText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    const extractedClaims = JSON.parse(claimsText);

    // Step 2: Search for each claim
    const searchResults = await Promise.all(
      extractedClaims.slice(0, 5).map(claim => searchClaim(claim))
    );

    // Step 3: Analyze with search results
    const analysisPrompt = `You are Proofly, a credibility analysis tool. Analyze these claims with search results.

CLAIMS:
${extractedClaims.map((c, i) => `${i + 1}. ${c}`).join('\n')}

SEARCH RESULTS:
${searchResults.map((results, i) => `
Claim ${i + 1} results:
${results.slice(0, 3).map(r => `- ${r.title}: ${r.description || ''}`).join('\n')}
`).join('\n')}

Return ONLY a JSON object with this structure:
{
  "overallScore": <number 0-100>,
  "scoreLabel": "<Low confidence|Medium confidence|High confidence>",
  "claims": [
    {
      "claim": "<claim text>",
      "status": "<verified|partial|unsupported>",
      "finding": "<calm, declarative assessment>",
      "sources": ["<source1>"] or []
    }
  ],
  "languageFlags": ["<flag1>"],
  "alternatives": []
}

Rules:
- Use calm, professional language
- No dramatic statements
- Be realistic about public verifiability
- Include sources when search results support claims`;

    const analysisResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: analysisPrompt
      }]
    });

    let analysisText = analysisResponse.content[0].text.trim();
    analysisText = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    const analysis = JSON.parse(analysisText);

    // Add UI metadata
    const scoreColor = analysis.overallScore >= 70 ? 'text-emerald-700' :
                      analysis.overallScore >= 40 ? 'text-amber-700' :
                      'text-slate-600';
    
    const scoreBg = analysis.overallScore >= 70 ? 'bg-emerald-50' :
                   analysis.overallScore >= 40 ? 'bg-amber-50' :
                   'bg-slate-50';

    const scoreBorder = analysis.overallScore >= 70 ? 'border-emerald-200' :
                       analysis.overallScore >= 40 ? 'border-amber-200' :
                       'border-slate-200';

    const enrichedClaims = analysis.claims.map(claim => ({
      ...claim,
      color: claim.status === 'verified' ? 'text-emerald-700' :
             claim.status === 'partial' ? 'text-amber-700' :
             'text-slate-600',
      borderColor: claim.status === 'verified' ? 'border-emerald-200' :
                  claim.status === 'partial' ? 'border-amber-200' :
                  'border-slate-200',
      bgColor: claim.status === 'verified' ? 'bg-emerald-50' :
              claim.status === 'partial' ? 'bg-amber-50' :
              'bg-slate-50',
      label: claim.status === 'verified' ? 'Verified' :
             claim.status === 'partial' ? 'Partial' :
             'Unsupported'
    }));

    return NextResponse.json({
      text,
      overallScore: analysis.overallScore,
      scoreLabel: analysis.scoreLabel,
      scoreColor,
      scoreBg,
      scoreBorder,
      claims: enrichedClaims,
      languageFlags: analysis.languageFlags || [],
      alternatives: analysis.alternatives || []
    });

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Analysis failed: ' + error.message },
      { status: 500 }
    );
  }
}