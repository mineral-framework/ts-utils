import { HttpStatus } from '../src'

describe('HttpStatus', () => {

    it('Should create OK Status', () => {
        const ok: HttpStatus = HttpStatus.OK()

        expect(ok.code).toEqual(200)
        expect(ok.status).toEqual('OK')
    })

    it('Should create CREATED Status', () => {
        const created: HttpStatus = HttpStatus.CREATED()

        expect(created.code).toEqual(201)
        expect(created.status).toEqual('Created')
    })

    it('Should create ACCEPTED Status', () => {
        const accepted: HttpStatus = HttpStatus.ACCEPTED()

        expect(accepted.code).toEqual(202)
        expect(accepted.status).toEqual('Accepted')
    })

    it('Should create BAD_REQUEST Status', () => {
        const badRequest: HttpStatus = HttpStatus.BAD_REQUEST()

        expect(badRequest.code).toEqual(400)
        expect(badRequest.status).toEqual('Bad Request')
    })

    it('Should create NOT_FOUND Status', () => {
        const notFound: HttpStatus = HttpStatus.NOT_FOUND()

        expect(notFound.code).toEqual(404)
        expect(notFound.status).toEqual('Not Found')
    })

    it('Should create INTERNAL_SERVER_ERROR Status', () => {
        const internalServerError: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR()

        expect(internalServerError.code).toEqual(500)
        expect(internalServerError.status).toEqual('Internal Server Error')
    })

    it('Should create Status by code', () => {
        const continueStatus: HttpStatus = HttpStatus.ofStatusCode(100)

        expect(continueStatus.code).toEqual(100)
        expect(continueStatus.status).toEqual('Continue')
    })

    it('Should throw error on unknown code', () => {
        expect(() => {
            HttpStatus.ofStatusCode(1000)
        }).toThrowError('Status code 1000 is unknown')
    })

    it('Should return 1xx Informational status', () => {
        const status: HttpStatus = HttpStatus.ofStatusCode(100)

        expect(status.is1XXInformational()).toBeTruthy()
    })

    it('Should return 2xx Success status', () => {
        const status: HttpStatus = HttpStatus.ofStatusCode(200)

        expect(status.is2XXSuccessful()).toBeTruthy()
    })

    it('Should return 3xx Redirection status', () => {
        const status: HttpStatus = HttpStatus.ofStatusCode(300)

        expect(status.is3XXRedirection()).toBeTruthy()
    })

    it('Should return 4xx Client Error status', () => {
        const status: HttpStatus = HttpStatus.ofStatusCode(400)

        expect(status.is4XXClientError()).toBeTruthy()
    })

    it('Should return 5xx Server Error status', () => {
        const status: HttpStatus = HttpStatus.ofStatusCode(500)

        expect(status.is5XXServerError()).toBeTruthy()
    })

    it('Should map codes to statuses', () => {
        expect(HttpStatus.ofStatusCode(100).status).toEqual('Continue')
        expect(HttpStatus.ofStatusCode(101).status).toEqual('Switching Protocols')
        expect(HttpStatus.ofStatusCode(102).status).toEqual('Processing')
        expect(HttpStatus.ofStatusCode(103).status).toEqual('Early Hints')
        expect(HttpStatus.ofStatusCode(200).status).toEqual('OK')
        expect(HttpStatus.ofStatusCode(201).status).toEqual('Created')
        expect(HttpStatus.ofStatusCode(202).status).toEqual('Accepted')
        expect(HttpStatus.ofStatusCode(203).status).toEqual('Non-Authoritative Information')
        expect(HttpStatus.ofStatusCode(204).status).toEqual('No Content')
        expect(HttpStatus.ofStatusCode(205).status).toEqual('Reset Content')
        expect(HttpStatus.ofStatusCode(206).status).toEqual('Partial Content')
        expect(HttpStatus.ofStatusCode(207).status).toEqual('Multi-Status')
        expect(HttpStatus.ofStatusCode(208).status).toEqual('Already Reported')
        expect(HttpStatus.ofStatusCode(226).status).toEqual('IM Used')
        expect(HttpStatus.ofStatusCode(300).status).toEqual('Multiple Choices')
        expect(HttpStatus.ofStatusCode(301).status).toEqual('Moved Permanently')
        expect(HttpStatus.ofStatusCode(302).status).toEqual('Found')
        expect(HttpStatus.ofStatusCode(303).status).toEqual('See Other')
        expect(HttpStatus.ofStatusCode(304).status).toEqual('Not Modified')
        expect(HttpStatus.ofStatusCode(305).status).toEqual('Use Proxy')
        expect(HttpStatus.ofStatusCode(306).status).toEqual('Switch Proxy')
        expect(HttpStatus.ofStatusCode(307).status).toEqual('Temporary Redirect')
        expect(HttpStatus.ofStatusCode(308).status).toEqual('Permanent Redirect')
        expect(HttpStatus.ofStatusCode(400).status).toEqual('Bad Request')
        expect(HttpStatus.ofStatusCode(401).status).toEqual('Unauthorized')
        expect(HttpStatus.ofStatusCode(402).status).toEqual('Payment Required')
        expect(HttpStatus.ofStatusCode(403).status).toEqual('Forbidden')
        expect(HttpStatus.ofStatusCode(404).status).toEqual('Not Found')
        expect(HttpStatus.ofStatusCode(405).status).toEqual('Method Not Allowed')
        expect(HttpStatus.ofStatusCode(406).status).toEqual('Not Acceptable')
        expect(HttpStatus.ofStatusCode(407).status).toEqual('Proxy Authentication Required')
        expect(HttpStatus.ofStatusCode(408).status).toEqual('Request Timeout')
        expect(HttpStatus.ofStatusCode(409).status).toEqual('Conflict')
        expect(HttpStatus.ofStatusCode(410).status).toEqual('Gone')
        expect(HttpStatus.ofStatusCode(411).status).toEqual('Length Required')
        expect(HttpStatus.ofStatusCode(412).status).toEqual('Precondition Failed')
        expect(HttpStatus.ofStatusCode(413).status).toEqual('Payload Too Large')
        expect(HttpStatus.ofStatusCode(414).status).toEqual('URI Too Long')
        expect(HttpStatus.ofStatusCode(415).status).toEqual('Unsupported Media Type')
        expect(HttpStatus.ofStatusCode(416).status).toEqual('Range Not Satisfiable')
        expect(HttpStatus.ofStatusCode(417).status).toEqual('Expectation Failed')
        expect(HttpStatus.ofStatusCode(418).status).toEqual(`I'm a teapot`)
        expect(HttpStatus.ofStatusCode(421).status).toEqual('Misdirected Request')
        expect(HttpStatus.ofStatusCode(422).status).toEqual('Unprocessable Entity')
        expect(HttpStatus.ofStatusCode(423).status).toEqual('Locked')
        expect(HttpStatus.ofStatusCode(424).status).toEqual('Failed Dependency')
        expect(HttpStatus.ofStatusCode(425).status).toEqual('Too Early')
        expect(HttpStatus.ofStatusCode(426).status).toEqual('Upgrade Required')
        expect(HttpStatus.ofStatusCode(428).status).toEqual('Precondition Required')
        expect(HttpStatus.ofStatusCode(429).status).toEqual('Too Many Requests')
        expect(HttpStatus.ofStatusCode(431).status).toEqual('Request Header Fields Too Large')
        expect(HttpStatus.ofStatusCode(451).status).toEqual('Unavailable For Legal Reasons')
        expect(HttpStatus.ofStatusCode(500).status).toEqual('Internal Server Error')
        expect(HttpStatus.ofStatusCode(501).status).toEqual('Not Implemented')
        expect(HttpStatus.ofStatusCode(502).status).toEqual('Bad Gateway')
        expect(HttpStatus.ofStatusCode(503).status).toEqual('Service Unavailable')
        expect(HttpStatus.ofStatusCode(504).status).toEqual('Gateway Timeout')
        expect(HttpStatus.ofStatusCode(505).status).toEqual('HTTP Version Not Supported')
        expect(HttpStatus.ofStatusCode(506).status).toEqual('Variant Also Negotiates')
        expect(HttpStatus.ofStatusCode(507).status).toEqual('Insufficient Storage')
        expect(HttpStatus.ofStatusCode(508).status).toEqual('Loop Detected')
        expect(HttpStatus.ofStatusCode(510).status).toEqual('Not Extended')
        expect(HttpStatus.ofStatusCode(511).status).toEqual('Network Authentication Required')
    })
})
