// sanitize.decorator.ts
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export function SanitizeHTML() {
  return Transform(({ value }) => sanitizeHtml(String(value ?? '')));
}
