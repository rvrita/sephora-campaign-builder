export default function botnavs(section, locale) {
    return `
</table>
<table width="700" border="0" cellspacing="0" cellpadding="0" align="center">
  ${locale === 'us' ?
  `<tr>
    <td style="padding-top:10px;">
      [#-- Dev Sandbox / 2021_New_Clients_Banners_Map --][#contentmap id='dda18b65-5406-489b-a7f3-30539cb5a198'/]
    </td>
  </tr>` : ``}
  ${locale === 'caFR' ?
  `<tr>
    <td>
      <a href="[@trackurl LinkID='' LinkName='spotitshopit' LinkTag='bb-spotitshopit' LinkDesc='' Tracked='ON' Encode='ON' LinkType='REDIRECT']https://www.sephora.com/ca/fr/?$deep_link=true[/@trackurl]"  target="_blank">
        <img border="0" style="display: block" alt="Spot it. Shop it." src="https://epidm.epsilon.com/CMS/Coding/Sephora/2018/05_May/01386064/ShotSpop_FR.jpg" width="700" height="71" />
      </a>
    </td>
  </tr>` : 
  `<tr>
    <td>
    ${locale === 'caEN' ?
      `<a href="[@trackurl LinkID='db25db80bdb3415d9c857ce10525206e' LinkName='spotitshopit' LinkTag='txt' Tracked='ON' Encode='OFF' AppendSuffix='ON' Render='ON' LinkType='REDIRECT']https://www.sephora.com/ca/en/?$deep_link=true[/@trackurl]"  target="_blank">`
      : `<a href="[@trackurl LinkID='db25db80bdb3415d9c857ce10525206e' LinkName='spotitshopit' LinkTag='txt' Tracked='ON' Encode='OFF' AppendSuffix='ON' Render='ON' LinkType='REDIRECT']https://www.sephora.com/?$deep_link=true[/@trackurl]"  target="_blank">`}
        <img border="0" style="display: block" alt="Spot it. Shop it." src="http://images.harmony.epsilon.com/ContentHandler/images?id=991bc8b3-0692-4b3a-86b8-1dae13277380" width="700" height="71" />
      </a>
    </td>
  </tr>`}
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