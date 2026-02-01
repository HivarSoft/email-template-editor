import React, { useEffect, useState } from 'react';
import EmailTemplateEditor from './EmailTemplateEditor';
import { TEditorConfiguration } from './documents/editor/core';

interface EmailTemplateEditorProps {
  template?: TEditorConfiguration;
  templateName?: string;
  onSave?: (blockTemplate: TEditorConfiguration, htmlTemplate: string, variables: Record<string, string>, templateName: string) => void;
}

/**
 * Client-only wrapper for EmailTemplateEditor
 * This component only renders on the client side to avoid SSR issues
 */
export default function ClientOnlyEmailTemplateEditor(props: EmailTemplateEditorProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading email template editor...</div>;
  }

  return <EmailTemplateEditor {...props} />;
}