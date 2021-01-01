export default function horizontal(image) {
  return `
  <tr>
    <td>
      ${image.link}
        <img border="0" style="display: block" src="http://images.harmony.epsilon.com/ContentHandler/images/de0a3226-d396-4c2c-b3a8-3ede2f831505/images/${image.filename}" width="700" height="${image.height}" alt="${image.alt}"/>
      </a>
    </td>
  </tr>`
};