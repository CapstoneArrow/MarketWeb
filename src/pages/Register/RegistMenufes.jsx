import React, { useState } from 'react';
import Header from '../../components/section/Header-Footer/Header';
import DaumPostcode from 'react-daum-postcode';
import './RegistMenu.css';

const RegistMenufes = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [roadAddress, setRoadAddress] = useState('');
    const [jibunAddress, setJibunAddress] = useState('');

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleAddressSelect = ({ roadAddress, jibunAddress }) => {
        setRoadAddress(roadAddress);
        setJibunAddress(jibunAddress);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted data:', {
            roadAddress,
            jibunAddress,
        });
    };

    return (
        <>
            <Header />
            <div className="regist-container">
                <h1 className="regist-title">📝 지역축제 정보 등록</h1>
                <form onSubmit={handleSubmit}>
                    <div className="photo-upload-and-period">
                        <div className="photo-upload">
                            <label htmlFor="photo" className="title-box">사진 첨부</label>
                            <input type="file" id="photo" name="photo" />
                        </div>
                        <div className="period-vertical">
                            <div className="period-box">
                                <label htmlFor="start-date" className="period-title">축제 시작일</label>
                                <input type="date" id="start-date" name="start-date" />
                             </div>
                            <div className="separator"></div>
                            <div className="period-box">
                                <label htmlFor="end-date" className="period-title">축제 종료일</label>
                                <input type="date" id="end-date" name="end-date" />
                            </div>
                        </div>
                    </div>
                    <div className="festival-name">
                        <label htmlFor="festival-name" className="title-box">축제 이름</label>
                        <input type="text" id="festival-name" name="festival-name" placeholder="축제명을 입력하세요" />
                    </div>
                    <div className="address-section">
                        <label htmlFor="road-address" className="title-box">도로명 주소</label>
                        <input 
                            type="text" 
                            id="road-address" 
                            name="road-address" 
                            value={roadAddress} 
                            onClick={handleOpenPopup} 
                            readOnly 
                            placeholder="도로명 주소를 검색하세요" 
                        />
                        <label htmlFor="jibun-address" className="title-box">지번 주소</label>
                        <input 
                            type="text" 
                            id="jibun-address" 
                            name="jibun-address" 
                            value={jibunAddress} 
                            readOnly 
                        />
                    </div>
                    <div className="festival-content">
                        <label htmlFor="content" className="title-box">축제 내용</label>
                        <textarea id="content" name="content" placeholder="축제 내용을 입력하세요"></textarea>
                    </div>
                    <div className="submit-button">
                        <button type="submit">등록</button>
                    </div>
                </form>
            </div>
            {isPopupOpen && (
                <div className="address-popup">
                    <button className="close-button" onClick={handleClosePopup}>닫기</button>
                    <DaumPostcode onComplete={handleAddressSelect} />
                </div>
            )}
        </>
    );
};

export default RegistMenufes;
