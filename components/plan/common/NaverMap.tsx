'use client'
import useMapStore from "@/stores/mapStore";
import { useEffect } from "react";

export default function NaverMap() {

  const{ markers}= useMapStore();

  useEffect(() => {
    const mapOptions = {
      center: new naver.maps.LatLng(37.3614483, 127.1114883),
      zoom: 12,
      minZoom: 10,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT
      },

    };

    const map = new naver.maps.Map('map', mapOptions);
    markers.forEach((markerData) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(markerData.position.lat, markerData.position.lng),
        map,
      });
  
      const infowindow = new naver.maps.InfoWindow({
        content: `<div style="padding:10px;">
                    <strong>도로명 주소: ${markerData.roadAddress}</strong><br />
                    <strong>건물명: ${markerData.buildingName}</strong>
                  </div>`,
      });
  
      naver.maps.Event.addListener(marker, "click", async (e) => {
        if (infowindow.getMap()) {
          infowindow.close();
        } else {
          infowindow.open(map, marker);

        }
      });
      map.setCenter(marker.getPosition());
      map.setZoom(16);
    });

  }, [markers]);
  
  return (
    <div className="w-full h-full">
      <div id="map" className="h-full w-full" />
    </div>
  );
}