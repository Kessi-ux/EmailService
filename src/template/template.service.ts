import { Injectable } from '@nestjs/common';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TemplateService {
  private templatesDir = path.join(process.cwd(), 'templates');

  constructor() {
    // Ensure templates folder exists
    if (!fs.existsSync(this.templatesDir)) {
      fs.mkdirSync(this.templatesDir, { recursive: true });
    }
  }

  /**
   * Compile an email template with dynamic data
   * @param templateName Name of the template file (without .hbs)
   * @param data Object containing dynamic placeholders
   * @returns Compiled HTML string
   */
  compileTemplate(templateName: string, data: Record<string, any>): string {
    const templatePath = path.join(this.templatesDir, `${templateName}.hbs`);

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template "${templateName}" not found`);
    }

    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = Handlebars.compile(templateSource);
    return template(data);
  }

  /**
   * Save a template to disk
   * @param name Template name (without .hbs)
   * @param html HTML content of the template
   * @returns Object with template name
   */
  saveTemplate(name: string, html: string) {
    const templatePath = path.join(this.templatesDir, `${name}.hbs`);
    fs.writeFileSync(templatePath, html, 'utf8');
    return { name };
  }

  /**
   * Retrieve template HTML by name
   * @param name Template name (without .hbs)
   * @returns Raw HTML string or null if not found
   */
  getTemplate(name: string): string | null {
    const templatePath = path.join(this.templatesDir, `${name}.hbs`);
    if (!fs.existsSync(templatePath)) return null;
    return fs.readFileSync(templatePath, 'utf8');
  }

  /**
   * List all templates available
   * @returns Array of template names
   */
  listTemplates(): string[] {
    if (!fs.existsSync(this.templatesDir)) return [];
    return fs
      .readdirSync(this.templatesDir)
      .filter((file) => file.endsWith('.hbs'))
      .map((file) => file.replace('.hbs', ''));
  }
}
