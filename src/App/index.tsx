import { useEffect, useState, useCallback } from 'react';

import { Stack, useTheme } from '@mui/material';
import { renderToStaticMarkup } from '@usewaypoint/email-builder';

import { useInspectorDrawerOpen, useSamplesDrawerOpen, resetDocument, useDocument, useVariables } from '../documents/editor/EditorContext';
import { TEditorConfiguration } from '../documents/editor/core';
import { extractVariablesFromDocument } from '../utils/variables';

import InspectorDrawer, { INSPECTOR_DRAWER_WIDTH } from './InspectorDrawer';
import SamplesDrawer, { SAMPLES_DRAWER_WIDTH } from './SamplesDrawer';
import TemplatePanel from './TemplatePanel';

function useDrawerTransition(cssProperty: 'margin-left' | 'margin-right', open: boolean) {
  const { transitions } = useTheme();
  return transitions.create(cssProperty, {
    easing: !open ? transitions.easing.sharp : transitions.easing.easeOut,
    duration: !open ? transitions.duration.leavingScreen : transitions.duration.enteringScreen,
  });
}

interface AppProps {
  template?: TEditorConfiguration;
  templateName?: string;
  htmlTemplate?: string;
  headerHeight?: number;
  marginLeftApp?: number;
  onSave?: (blockTemplate: TEditorConfiguration, htmlTemplate: string, variables: Record<string, string>, templateName: string) => void;
}

export default function App({ 
  template, 
  templateName: initialTemplateName = "Untitled Template", 
  htmlTemplate, 
  headerHeight = 0,
  marginLeftApp = 0,
  onSave
}: AppProps) {
  const inspectorDrawerOpen = useInspectorDrawerOpen();
  const samplesDrawerOpen = useSamplesDrawerOpen();
  const document = useDocument();
  const variables = useVariables();
  
  const [templateName, setTemplateName] = useState(initialTemplateName);

  // Set initial template if provided
  useEffect(() => {
    if (template) {
      resetDocument(template);
    }
    // Note: htmlTemplate prop is not used for setting initial state
    // as we need the structured document format, not HTML
  }, [template]);

  // Auto-save functionality
  const triggerAutoSave = useCallback(() => {
    if (onSave) {
      try {
        // Generate HTML template
        const htmlTemplate = renderToStaticMarkup(document, { rootBlockId: 'root' });
        
        // Extract and merge variables
        const documentVariables = extractVariablesFromDocument(document);
        const allVariables: Record<string, string> = {};
        
        documentVariables.forEach(varName => {
          allVariables[varName] = variables[varName] || '';
        });
        
        Object.keys(variables).forEach(varName => {
          if (!(varName in allVariables)) {
            allVariables[varName] = variables[varName];
          }
        });

        onSave(document, htmlTemplate, allVariables, templateName);
      } catch (error) {
        console.error('Auto-save error:', error);
      }
    }
  }, [document, variables, templateName, onSave]);

  // Auto-save when document, variables, or template name changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      triggerAutoSave();
    }, 3000); // 1 second debounce

    return () => clearTimeout(timeoutId);
  }, [triggerAutoSave]);

  const handleTemplateNameChange = (newName: string) => {
    setTemplateName(newName);
  };

  const handleSave = (blockTemplate: TEditorConfiguration, htmlTemplate: string, variables: Record<string, string>) => {
    if (onSave) {
      onSave(blockTemplate, htmlTemplate, variables, templateName);
    }
  };

  const marginLeftTransition = useDrawerTransition('margin-left', samplesDrawerOpen);
  const marginRightTransition = useDrawerTransition('margin-right', inspectorDrawerOpen);

  return (
    <>
      <InspectorDrawer headerHeight={headerHeight} />
      <SamplesDrawer 
        templateName={templateName}
        onTemplateNameChange={handleTemplateNameChange}
        headerHeight={headerHeight}
        marginLeftApp={marginLeftApp}
      />

      <Stack
        sx={{
          marginRight: inspectorDrawerOpen ? `${INSPECTOR_DRAWER_WIDTH}px` : 0,
          marginLeft: samplesDrawerOpen ? `${SAMPLES_DRAWER_WIDTH}px` : 0,
          transition: [marginLeftTransition, marginRightTransition].join(', '),
        }}
      >
        <TemplatePanel onSave={handleSave} />
      </Stack>
    </>
  );
}