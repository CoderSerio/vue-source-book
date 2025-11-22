
import React from 'react';

const KEYWORDS = [
  'function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 
  'class', 'new', 'this', 'import', 'export', 'default', 'typeof', 'extends', 'super'
];

const BUILTINS = [
  'console', 'log', 'document', 'window', 'Object', 'Array', 'Set', 'Map', 'Math', 'Proxy', 'Reflect'
];

const SPECIALS = [
  'dep', 'notify', 'depend', 'get', 'set', 'mount', 'patch', 'h', 'render', 'createApp', 'ref', 'reactive', 'effect'
];

interface CodeHighlightProps {
  code: string;
}

const CodeHighlight: React.FC<CodeHighlightProps> = ({ code }) => {
  // Improved Regex to split by delimiters but keep them, 
  // and handle strings specifically without greedily eating newlines inappropriately unless meant to.
  const tokens = code.split(/(\/\/.*|\/\*[\s\S]*?\*\/|`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|\b\d+\b|[(){}[\].,:;+\-*/=<>!&|]|\s+)/g);

  return (
    <code className="font-mono text-sm md:text-base leading-relaxed">
      {tokens.map((token, i) => {
        if (!token) return null;

        // Default text color (Light Grey/Whiteish)
        let colorClass = 'text-[#dcdfe4]'; 

        const trimmed = token.trim();

        // Whitespace
        if (!trimmed) {
            return <span key={i}>{token}</span>;
        }

        // Strings (Green)
        if (
            (token.startsWith("'") && token.endsWith("'")) || 
            (token.startsWith('"') && token.endsWith('"')) || 
            (token.startsWith('`') && token.endsWith('`'))
        ) {
          colorClass = 'text-[#98c379]'; 
        } 
        // Comments (Italic Grey)
        else if (token.startsWith('//') || token.startsWith('/*')) {
          colorClass = 'text-[#7f848e] italic';
        }
        // Keywords (Purple)
        else if (KEYWORDS.includes(trimmed)) {
          colorClass = 'text-[#c678dd] font-bold';
        }
        // Built-ins (Yellow/Gold)
        else if (BUILTINS.includes(trimmed)) {
          colorClass = 'text-[#e5c07b]';
        }
        // Special Vue terms (Cyan/Vue Green)
        else if (SPECIALS.includes(trimmed)) {
          colorClass = 'text-[#42b883] font-bold';
        }
        // Numbers (Orange)
        else if (!isNaN(Number(token))) {
          colorClass = 'text-[#d19a66]';
        }
        // Operators/Punctuation (Blue-ish)
        else if (['=', ':', ';', '.', ',', '(', ')', '{', '}', '[', ']'].includes(trimmed)) {
             colorClass = 'text-[#56b6c2]';
        }
        // Function definitions (Blue)
        else if (i < tokens.length - 1 && tokens[i+1]?.trim() === '(') {
             colorClass = 'text-[#61afef]';
        }

        return (
          <span key={i} className={colorClass}>
            {token}
          </span>
        );
      })}
    </code>
  );
};

export default CodeHighlight;
