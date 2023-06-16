// File: /src/components/SearchBar/SearchbarElements.js
import styled from "styled-components";

// Styled-Components
export const SearchbarContainer = styled.div`
    display: flex;
    line-height: 28px;
    align-items: center;
    position: relative;
    max-width: 350px;
    margin-left: auto;
    margin-right: auto;
`;

export const SearchInput = styled.input`
    width: 100%;
    height: 40px;
    line-height: 28px;
    padding: 0 1rem;
    padding-left: 2.5rem;
    border: 2px solid transparent;
    border-radius: 8px;
    outline: none;
    background-color: #f3f3f4;
    color: #0d0c22;
    transition: .3s ease;

    &::placeholder {
        color: #9e9ea7;
    }

    &::focus {
        outline: none;
        border-color: rgba(234,76,137,0.4);
        background-color: #fff;
        box-shadow: 0 0 0 4px rgb(234 76 137 / 10%);
    }

    &::hover {
        outline: none;
        border-color: rgba(234,76,137,0.4);
        background-color: #fff;
        box-shadow: 0 0 0 4px rgb(234 76 137 / 10%);
    }
`;

export const SearchIcon = styled.svg`
    position: absolute;
    left: 1rem;
    fill: #9e9ea7;
    width: 1rem;
    height: 1rem;
`;