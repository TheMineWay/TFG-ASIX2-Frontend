import React from 'react'

export default function useCoins() {
    
    function displayPrice(price: number): string {
        return `${price}€`;
    }

    return {
        displayPrice,
    };
}