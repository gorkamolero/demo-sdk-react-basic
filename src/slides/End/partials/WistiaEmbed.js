import React, { useEffect } from 'react';

const Video = () => {

  useEffect(() => {
    const script1 = document.createElement("script");
    const script2 = document.createElement("script");

    script1.src = "https://fast.wistia.com/embed/medias/klmxn5dq4o.jsonp?idType=ab-test";
    script1.async = true;

    script2.src = "https://fast.wistia.com/assets/external/E-v1.js";
    script2.async = true;

    document.body.appendChild(script1);
    document.body.appendChild(script2);
  }, [])
  return (
    <div className="wistia_responsive_padding" style={{
      padding: '56.25% 0 0 0',
      position: 'relative'
    }}>
      <div className="wistia_responsive_wrapper" style={{
        height: '100%',
        left: '0',
        position: 'absolute',
        top: '0',
        width: '100%',
      }}>
        <div className="wistia_embed wistia_async_klmxn5dq4o idType=ab-test seo=true videoFoam=true" style={{
          height: '100%',
          position: 'relative',
          width: '100%'
        }}></div>
      </div>
    </div>
  );
}
 
export default Video;