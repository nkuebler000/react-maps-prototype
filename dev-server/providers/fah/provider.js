const cheerio = require('cheerio');
const fs = require('fs');

const getNewUrl = (host, href) => {
  if (href && href.length > 0 && !href.startsWith('//')) {
    return href.startsWith('/') ? `${host}${href}` : `${host}/${href}`;
  }
};

const updateTagUrlAttrs = ($, host, tags, attrName) => {
  tags.each((idx, elt) => {
    const chElt = $(elt);
    const attrVal = chElt.attr(attrName);
    chElt.attr(attrName, getNewUrl(host, attrVal)); 
  })
};

module.exports = {
  parse: (html, host, userLat, userLng) => {
    const $ = cheerio.load(html);
    const main = $('#Main .fa-hospital');
    main.removeClass('fa-hospital');
    main.addClass('fa-hospital2');
    
    main.empty();
    const reactRootTag = fs.readFileSync(`${__dirname}/templates/app-root-template.html`, 'utf8');
    main.append(reactRootTag);

    updateTagUrlAttrs($, host, $('link:not([href^="http"])'), 'href');
    updateTagUrlAttrs($, host, $('a[href^="/"]'), 'href');
    updateTagUrlAttrs($, host, $('img:not([src^="http"])'), 'src');
    updateTagUrlAttrs($, host, $('script:not([src^="http"])'), 'src');

    let reactScriptTags = fs.readFileSync(`${__dirname}/templates/script-template.html`, 'utf8');

    

    $('body').append(reactScriptTags);

    return $.html();
  },
  proxyUrls: [
    '/api/Search/HospitalSearch/GetHospitals',
    '/Includes/_images/custom-map-pin.png'
  ]
};