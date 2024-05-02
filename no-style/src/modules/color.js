import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

// 문자열을 랜덤 색상 코드로 변환하는 함수
export function stringToColorHash(input) {
    // SHA-256 해시 생성
    let hash = CryptoJS.SHA256(input).toString();

    // RGB 값 추출
    let r = parseInt(hash.slice(0, 2), 16);
    let g = parseInt(hash.slice(2, 4), 16);
    let b = parseInt(hash.slice(4, 6), 16);

    // 랜덤 색상 코드 생성
    let color = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    
    return color;
}

// 10진수를 16진수 문자열로 변환
function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}