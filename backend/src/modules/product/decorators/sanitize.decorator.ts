// sanitize.decorator.ts
import { Transform } from 'class-transformer';
import sanitizeHtml from 'sanitize-html';

export function SanitizeHTML(options = {}) {
  return Transform(({ value }) =>
    sanitizeHtml(String(value ?? ''), {
      allowedTags: [],
      allowedAttributes: {},
      ...options,
    }),
  );
}
