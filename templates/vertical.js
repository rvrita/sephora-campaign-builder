export default function vertical(section) {
  return `
  <tr>
    <td>
      <table width="700" border="0" cellspacing="0" cellpadding="0" align="center">
        <tr>
        ${section.map((image) => {
          return `  <td>
            ${image.link}
              <img border="0" style="display: block" src="http://images.harmony.epsilon.com/ContentHandler/images/de0a3226-d396-4c2c-b3a8-3ede2f831505/images/${image.filename}" width="${image.width}" height="${image.height}" alt="${image.alt}"/>
            </a>
          </td>
        `
        }).join('')}
        </tr>
      </table>
    </td>
  </tr>`
};