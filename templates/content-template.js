/* eslint-disable no-else-return */
export default function content_template(imageInfos, alts, links) {
  return `<!-- email main content -->
  <table width="700" border="0" cellspacing="0" cellpadding="0" align="center">
  ${imageInfos.map((image, index) => {
//  if (image.width === 320 && image.height === 585) {
//    return `botnav here`
//  } else if () {

//  } else {
  return `
  <tr>
    <td>
      ${links[index]}
        <img src="http://images.harmony.epsilon.com/ContentHandler/images/de0a3226-d396-4c2c-b3a8-3ede2f831505/images/${image.filename}" width="700" height="${image.height}" alt="${alts[index]}"/>
      </a>
    </td>
  </tr>`
 }).join('')}
</table>`
};