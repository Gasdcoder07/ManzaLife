'use client';

import SwaggerUI from "swagger-ui-react"
import 'swagger-ui-react/swagger-ui.css'

export default function ApiDoc() {
    return (
        <section className="container mx-auto mt-12">
            <SwaggerUI url="/api/swagger" />
        </section>
    )
}