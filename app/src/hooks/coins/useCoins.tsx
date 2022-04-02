import React from 'react'

export default function useCoins() {
    
    function displayPrice(price: number): JSX.Element {
        return <span>{`${price}€`}</span>;
    }

    return {
        displayPrice,
    };
}