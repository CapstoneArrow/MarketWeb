import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './MarketMap.css';

const MarketMap = ({ market }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(market.place1, market.place2),
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        const markerPosition = new window.kakao.maps.LatLng(market.place1, market.place2);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        const content = `
          <div class="wrap">
            <div class="info">
              <div class="title">
                ${market.title}
                <div class="close" onclick="closeOverlay()" title="닫기"></div>
              </div>
              <div class="body">
                <div class="img">
                  <img src="${imageUrl}" width="70" height="70">
                </div>
                <div class="desc">
                  <div class="ellipsis">${market.locate}</div>
                  <div class="jibun ellipsis">${market.tel}</div>
                  <div><a href="${market.page}" target="_blank" class="link">홈페이지</a></div>
                </div>
              </div>
            </div>
          </div>`;

        const overlay = new window.kakao.maps.CustomOverlay({
          content: content,
          map: map,
          position: marker.getPosition(),
        });

        window.kakao.maps.event.addListener(marker, 'click', () => {
          overlay.setMap(map);
        });

        window.closeOverlay = function () {
          overlay.setMap(null);
        };
      } else {
        console.error('Kakao Maps API is not loaded');
      }
    };

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_APP_KEY&autoload=false`;
    script.async = true;
    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(loadKakaoMap);
      } else {
        console.error('Kakao Maps API is not loaded');
      }
    };
    script.onerror = () => console.error('Kakao Maps API 스크립트 로드 실패');

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [market, imageUrl]);

  useEffect(() => {
    const getImageUrl = (marketName) => {
      try {
        return require(`../../../public/image/${marketName}.jpg`);
      } catch (error) {
        return 'default-image-url.jpg'; // default image url
      }
    };

    setImageUrl(getImageUrl(market.title));
  }, [market]);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
};

MarketMap.propTypes = {
  market: PropTypes.shape({
    title: PropTypes.string.isRequired,
    place1: PropTypes.number.isRequired,
    place2: PropTypes.number.isRequired,
    locate: PropTypes.string.isRequired,
    tel: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired,
  }).isRequired,
};

export default MarketMap;
