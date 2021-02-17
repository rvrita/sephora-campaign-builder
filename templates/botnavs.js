export default function botnavs(section) {
  return `
</table>
<table width="700" border="0" cellspacing="0" cellpadding="0" align="center">
  <tr>
    <td>
      <a href="[@trackurl LinkID='' LinkName='spotitshopit' LinkTag='txt' LinkDesc='' Tracked='ON' Encode='OFF' LinkType='REDIRECT']https://www.sephora.com/?$deep_link=true[/@trackurl]"  target="_blank">
        <img border="0" style="display: block" alt="Spot it. Shop it." src="http://images.harmony.epsilon.com/ContentHandler/images?id=991bc8b3-0692-4b3a-86b8-1dae13277380" width="700" height="71" />
      </a>
    </td>
  </tr>
  <tr>
    <td style="padding-bottom:20px;">
      <table width="700" border="0" cellspacing="0" cellpadding="0" align="center">
        <tr>
        <td width="20">&nbsp;</td>
          <td>
            ${section[0].link}
              <img border="0" style="display: block" src="http://images.harmony.epsilon.com/ContentHandler/images/de0a3226-d396-4c2c-b3a8-3ede2f831505/images/${section[0].filename}" width="320" height="585" alt="${section[0].alt}"/>
            </a>
          </td>
          <td width="20">&nbsp;</td>
          <td align="right">
            ${section[1].link}
              <img border="0" style="display: block" src="http://images.harmony.epsilon.com/ContentHandler/images/de0a3226-d396-4c2c-b3a8-3ede2f831505/images/${section[1].filename}" width="320" height="585" alt="${section[1].alt}"/>
            </a>
          </td>
          <td width="20">&nbsp;</td>
        </tr>
      </table>
    </td>
  </tr>`
};