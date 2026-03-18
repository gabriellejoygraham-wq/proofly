// Share utilities

export const shareViaWebAPI = async (analysis) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Proofly Analysis',
        text: `Credibility Check: ${analysis.overallScore}% confidence\n\n${analysis.topFindings.join('\n')}`,
        url: window.location.href
      });
      return true;
    } catch (err) {
      console.log('Share cancelled or failed:', err);
      return false;
    }
  }
  return false;
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

export const generateShareText = (analysis) => {
  return `🔍 Proofly Check

Credibility: ${analysis.overallScore}%

${analysis.redFlags ? analysis.redFlags.join('\n') : ''}

${analysis.topFindings.slice(0, 2).join('\n')}

Check claims at proofly.app`;
};