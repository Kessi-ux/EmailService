import { Controller, Post, Get, Body } from '@nestjs/common';
import { TemplateService } from './template.service';
import * as fs from 'fs';
import * as path from 'path';

class CreateTemplateDto {
  name: string;
  html: string;
}

@Controller('emails/templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  createTemplate(@Body() dto: CreateTemplateDto) {
    return this.templateService.saveTemplate(dto.name, dto.html);
  }

  @Get()
  listTemplates() {
    return fs
      .readdirSync(path.join(process.cwd(), 'templates'))
      .filter((f) => f.endsWith('.hbs'))
      .map((f) => f.replace('.hbs', ''));
  }
}
