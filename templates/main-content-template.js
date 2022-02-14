import horizontal from './horizontal';
import botnavs from './botnavs';
import vertical from './vertical';

export default function main_content_template(sections, locale) {
  // export default function content_template(sections) {
  return `<!-- email main content -->
<table width="700" border="0" cellspacing="0" cellpadding="0" align="center">
  ${sections.map((section) => {
    if (section[0].width === 320 && section[0].height === 585) {
      return botnavs(section, locale);
    } else if (section.length === 1) {
      return horizontal(section[0]);
    } else {
      return vertical(section);
    }
 }).join('')}
</table>`
};
