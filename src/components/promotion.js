import React from "react";
import WhiteBishop from './pieces/images/whiteBishop.svg';
import BlackBishop from './pieces/images/blackBishop.svg';
import WhiteQueen from './pieces/images/whiteQueen.svg';
import BlackQueen from './pieces/images/blackQueen.svg';
import WhiteKnight from './pieces/images/whiteKnight.svg';
import BlackKnight from './pieces/images/blackKnight.svg';
import WhiteRook from './pieces/images/whiteRook.svg';
import BlackRook from './pieces/images/blackRook.svg';
import { promotePiece } from "./game";

export default function Promotion({ color, hidden, pos }) {

    function renderColor(color) {
        if (color === "white") {
            return renderWhitePromotion();
        } else {
            return renderBlackPromotion();
        }
    }

    function handleClick(e, piece) {
        promotePiece(color, pos[0], pos[1], piece)
    }



    function renderWhitePromotion() {
        return (
            <div className="promotion-container">
                <div className="promotion-popup white-promotion">
                    <div  onClick={(e) => handleClick(e, "queen")} className="promotion-piece-wrapper">
                        <img src={WhiteQueen} alt="White Queen"></img>
                    </div>
                    
                    <div value="bishop" onClick={(e) => handleClick(e, "bishop")} className="promotion-piece-wrapper">
                        <img src={WhiteBishop} alt="White Bishop"></img>
                    </div>
                    
                    <div value="knight" onClick={(e) => handleClick(e, "knight")} className="promotion-piece-wrapper">
                        <img src={WhiteKnight} alt="White Knight"></img>
                    </div>
                    
                    <div value="rook" onClick={(e) => handleClick(e, "rook")} className="promotion-piece-wrapper">
                        <img src={WhiteRook} alt="White Rook"></img>
                    </div>
                </div> 
            </div>
        )
    }

    function renderBlackPromotion() {
        return (
            <div className="promotion-container">
                <div className="promotion-popup black-promotion">
                    <div onClick={(e) => handleClick(e, "queen")} className="promotion-piece-wrapper">
                        <img src={BlackQueen} alt="Black Queen"></img>
                    </div>
                    
                    <div onClick={(e) => handleClick(e, "bishop")} className="promotion-piece-wrapper">
                        <img src={BlackBishop} alt="Black Bishop"></img>
                    </div>
                    
                    <div onClick={(e) => handleClick(e, "knight")} className="promotion-piece-wrapper">
                        <img src={BlackKnight} alt="Black Knight"></img>
                    </div>
                    
                    <div onClick={(e) => handleClick(e, "rook")} className="promotion-piece-wrapper">
                        <img src={BlackRook} alt="Black Rook"></img>
                    </div>
                </div> 
            </div>
        )
    }

    if (hidden) {
        return <div className="promotion-container"></div>
    }

    return (
        <div className="promotion-container">
            {renderColor(color)}
        </div>
    )

    
    
}