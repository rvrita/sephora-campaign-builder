export default function gmail() {
  return `[#assign script_var = "<scr" + "ipt type='application/ld+json'>"]
\${script_var}
  [{
    "@context": "http://schema.org/",
    "@type": "Organization",
    "name": "Sephora",
    "logo": "http://images.harmony.epsilon.com/ContentHandler/images/de0a3226-d396-4c2c-b3a8-3ede2f831505/images/2021_Sephora_Logo.png"
  },{
    "@context": "http://schema.org/",
    "@type": "DiscountOffer",
    "description": "Get a trial size",
    "discountCode": "RAREGLOSS"
  },{
    "@context": "http://schema.org/",
    "@type": "PromotionCard",
    "image": "http://images.harmony.epsilon.com/ContentHandler/images/de0a3226-d396-4c2c-b3a8-3ede2f831505/images/2021-1-8-rare-monochromatic-fos-email-inbox-gmail-promo-tab-banner-en-us.jpg"
  }]
[#assign script_var = "</scr" + "ipt>"]
\${script_var}`
};