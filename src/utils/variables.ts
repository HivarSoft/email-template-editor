// Utility functions for handling template variables

export function replaceVariables(text: string, variables: Record<string, string>): string {
  if (!text || typeof text !== 'string') {
    return text;
  }
  
  return text.replace(/\{\{([^}]+)\}\}/g, (match, variableName) => {
    const trimmedName = variableName.trim();
    return variables[trimmedName] !== undefined ? variables[trimmedName] : match;
  });
}

export function extractVariablesFromText(text: string): string[] {
  if (!text || typeof text !== 'string') {
    return [];
  }
  
  const matches = text.match(/\{\{([^}]+)\}\}/g);
  if (!matches) {
    return [];
  }
  
  return matches.map(match => match.replace(/\{\{|\}\}/g, '').trim());
}

export function extractVariablesFromDocument(document: any): string[] {
  const variables = new Set<string>();
  
  const extractFromText = (text: string) => {
    const vars = extractVariablesFromText(text);
    vars.forEach(v => variables.add(v));
  };

  const traverseDocument = (obj: any) => {
    if (typeof obj === 'string') {
      extractFromText(obj);
    } else if (typeof obj === 'object' && obj !== null) {
      Object.values(obj).forEach(value => traverseDocument(value));
    }
  };

  traverseDocument(document);
  return Array.from(variables);
}