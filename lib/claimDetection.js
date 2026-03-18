// Claim type detection utilities

export const detectClaimType = (text) => {
  const lowerText = text.toLowerCase();
  
  // Money/Income patterns
  if (/(made|earned|generated).*([$€£]\d+|figure|income)/i.test(text) || 
      /passive income|side hustle|financial freedom|quit my job/i.test(text)) {
    return {
      type: 'money',
      label: 'Money Claim Detected',
      signals: ['Income claims', 'Business revenue', 'Earnings statements'],
      icon: 'DollarSign',
      color: 'emerald',
      promptAdjustment: `
SPECIFIC FOCUS FOR MONEY CLAIMS:
- Look for income/revenue claims with no supporting documentation
- Flag vague earnings timeframes
- Check for "get rich quick" language patterns
- Identify unverifiable business claims
- Note lack of tax records, bank statements, or third-party verification
      `
    };
  }
  
  // Health/Medical patterns
  if (/doctor|medical|cure|heal|treatment|diagnosis|symptom/i.test(text) ||
      /lose weight|get fit|health|wellness|supplement|natural remedy/i.test(text)) {
    return {
      type: 'health',
      label: 'Health Claim Detected',
      signals: ['Medical advice', 'Health outcomes', 'Treatment claims'],
      icon: 'Heart',
      color: 'rose',
      promptAdjustment: `
SPECIFIC FOCUS FOR HEALTH CLAIMS:
- Medical claims require high verification standards
- Flag any "cure" or "treatment" language without medical backing
- Check for FDA disclaimers or medical licensing
- Note lack of clinical studies or peer-reviewed research
- Identify dangerous health advice that could cause harm
      `
    };
  }
  
  // Authority/Expertise patterns
  if (/expert|certified|coach|mentor|guru|consultant|advisor/i.test(text) ||
      /(helped|coached|trained).*(clients|people|students)/i.test(text)) {
    return {
      type: 'authority',
      label: 'Authority Claim Detected',
      signals: ['Credentials', 'Client results', 'Expertise claims'],
      icon: 'Briefcase',
      color: 'blue',
      promptAdjustment: `
SPECIFIC FOCUS FOR AUTHORITY CLAIMS:
- Verify professional certifications and credentials
- Check for vague client count claims
- Look for specific vs. generic expertise language
- Identify self-appointed titles without backing
- Note lack of verifiable track record
      `
    };
  }
  
  // Influencer/Success patterns
  if (/featured in|mentioned in|appeared on|award|recognized/i.test(text) ||
      /successful|entrepreneur|founded|built.*business/i.test(text)) {
    return {
      type: 'influencer',
      label: 'Success Claim Detected',
      signals: ['Press mentions', 'Business claims', 'Achievement statements'],
      icon: 'TrendingUp',
      color: 'purple',
      promptAdjustment: `
SPECIFIC FOCUS FOR SUCCESS CLAIMS:
- Verify press mentions (editorial vs. contributor posts)
- Check for company acquisition/exit records
- Look for inflated achievement language
- Identify self-promotion without third-party validation
- Note lack of public business records
      `
    };
  }

  return null;
};

export const extractRedFlags = (claims, languageFlags) => {
  const redFlags = [];
  
  // Check for common scam patterns
  claims.forEach(claim => {
    if (claim.claim.match(/\$[\d,]+/)) {
      redFlags.push('💰 Specific income claim without proof');
    }
    if (claim.claim.match(/\d{1,3}[,.]?\d{3}\+/)) {
      redFlags.push('📊 Vague quantifiers ("10,000+")');
    }
    if (claim.claim.match(/proven|guaranteed|secret|system/i)) {
      redFlags.push('🎯 Marketing buzzwords detected');
    }
  });
  
  // Check language flags
  if (languageFlags.some(flag => flag.includes('urgency'))) {
    redFlags.push('⏰ Urgency language typical of scams');
  }
  
  if (languageFlags.some(flag => flag.includes('vague'))) {
    redFlags.push('❓ Vague proof phrases used');
  }
  
  return [...new Set(redFlags)].slice(0, 3); // Max 3 red flags
};