import React from 'react'
import { useParams } from 'react-router';

export default function MovieDetails() {
    const { id } = useParams();
    return (
        <div>
            <div>
                <h1>ID: {id}</h1>
            </div>
        </div>
    )
}
