import { Optional } from '../src'

interface Message {
    message: string
}

interface MessageWrapper {
    value: Message
}

describe('Optional', () => {

    let message: Message
    let other: Message
    let opt: Optional<Message>
    let nullOpt: Optional<Message>
    let undefinedOpt: Optional<Message>
    let empty: Optional<Message>

    let consumer

    beforeEach(() => {
        message = {
            message: 'Hello World!',
        }

        other = {
            message: 'Hello Other!',
        }

        opt = Optional.of(message)
        nullOpt = Optional.ofNullable(null)
        undefinedOpt = Optional.ofNullable(undefined)
        empty = Optional.empty()

        consumer = jest.fn()
    })

    it('Should create an empty Optional', () => {
        expect(empty.isEmpty()).toBeTruthy()
    })

    it('Should create present Optional', () => {
        expect(opt.isPresent()).toBeTruthy()
    })

    it('Should create present optional on Optiona.ofNullable', () => {
        const optOfNullable = Optional.ofNullable(message)

        expect(optOfNullable.isPresent()).toBeTruthy()
    })

    it('Should throw error on Optional.of when null', () => {
        expect(() => {
            Optional.of(null)
        }).toThrowError('Passed value is null or undefined')
    })

    it('Should throw error on Optional.of when undefined', () => {
        expect(() => {
            Optional.of(undefined)
        }).toThrowError('Passed value is null or undefined')
    })

    it('Should not throw error on Optional.ofNullable when null', () => {
        expect(() => {
            Optional.ofNullable(null)
        }).toBeTruthy()
    })

    it('Should not throw error on Optional.ofNullable when undefined', () => {
        expect(() => {
            Optional.ofNullable(undefined)
        }).toBeTruthy()
    })

    it('Should return obj on Optional.get', () => {
        expect(opt.get()).toEqual(message)
    })

    it('Should throw error on Optional.get when null', () => {
        expect(() => {
            empty.get()
        }).toThrowError('The value is not present')
    })

    it('Should call consumer on Optional.ifPresent', () => {
        opt.ifPresent(consumer)
        expect(consumer).toHaveBeenCalled()
    })

    it('Should not call consumer on Optional.ifPresent if empty', () => {
        empty.ifPresent(consumer)
        expect(consumer).not.toHaveBeenCalled()
    })

    it('Should call consumer on Optional.ifPresentOrElse', () => {
        const elseConsumer = jest.fn()
        opt.ifPresentOrElse(consumer, elseConsumer)
        expect(consumer).toHaveBeenCalled()
        expect(elseConsumer).not.toHaveBeenCalled()
    })

    it('Should call elser on Optional.ifPresentOrElse if empty', () => {
        const elseConsumer = jest.fn()
        empty.ifPresentOrElse(consumer, elseConsumer)
        expect(consumer).not.toHaveBeenCalled()
        expect(elseConsumer).toHaveBeenCalled()
    })

    it('Should return value on Optional.orElse', () => {
        const result = opt.orElse(other)
        expect(result).toEqual(message)
    })

    it('Should return else on Optional.orElse if empty', () => {
        const result = empty.orElse(other)
        expect(result).toEqual(other)
    })

    it('Should return value on Optional.orElseGet', () => {
        const supplier = jest.fn()

        const result = opt.orElseGet(supplier)
        expect(result).toEqual(message)
        expect(supplier).not.toHaveBeenCalled()
    })

    it('Should call supplier on Optional.orElseGet if empty', () => {
        const supplier = jest.fn(() => other)

        const result = empty.orElseGet(supplier)
        expect(result).toEqual(other)
        expect(supplier).toHaveBeenCalled()
    })

    it('Should return value on Optional.orElseThrow', () => {
        const err: Error = new Error('Err')

        const result = opt.orElseThrow(() => err)
        expect(result).toEqual(message)
    })

    it('Should throw error on Optional.orElseThrow if empty', () => {
        const err: Error = new Error('Err')

        expect(() => {
            empty.orElseThrow(() => err)
        }).toThrowError('Err')
    })

    it('Should return value on Optional.orNull', () => {
        const result = opt.orNull()
        expect(result).toEqual(message)
    })

    it('Should return null on Optional.orNull if empty', () => {
        const result = empty.orNull()
        expect(result).toBeNull()
    })

    it('Should return value on Optional.or', () => {
        const supplier = jest.fn()
        const result = opt.or(supplier)
        expect(result).toEqual(opt)
    })

    it('Should return supplier on Optional.or if empty', () => {
        const supplier = jest.fn(() => {
            return Optional.of(other)
        })

        const result = empty.or(supplier)
        expect(supplier).toHaveBeenCalled()
        expect(result.get()).toEqual(other)
    })

    it('Should return filtered value on Optional.filter', () => {
        const result = opt.filter((m) => m.message === 'Hello World!')

        expect(result.isPresent()).toBeTruthy()
    })

    it('Should return empty on Optional.filter', () => {
        const result = opt.filter((m) => m.message === 'Hello Other')

        expect(result.isEmpty()).toBeTruthy()
    })

    it('Should return empty on Optional.filter if empty', () => {
        const filter = jest.fn()

        const result = empty.filter(filter)

        expect(result.isEmpty()).toBeTruthy()
        expect(filter).not.toHaveBeenCalled()
    })

    it('Should call map on Optional.map', () => {
        const messageWrapper: MessageWrapper = {
            value: message,
        }

        const map = jest.fn((m: Message): MessageWrapper => {
            return {
                value: m,
            }
        })

        const result = opt.map(map)
        expect(map).toHaveBeenCalled()
        expect(result.isPresent()).toBeTruthy()
        expect(result.get()).toEqual(messageWrapper)
    })

    it('Should not call map on Optional.map if empty', () => {
        const map = jest.fn()

        const result = empty.map(map)
        expect(map).not.toHaveBeenCalled()
        expect(result.isPresent()).toBeFalsy()
    })

    it('Should call supplier on Optional.flatMap', () => {
        const messageWrapper: MessageWrapper = {
            value: message,
        }

        const optMessageWrapper: Optional<MessageWrapper> = Optional.of(messageWrapper)

        const supplier = jest.fn((m: Message) => optMessageWrapper)

        const result = opt.flatMap<MessageWrapper>(supplier)

        expect(supplier).toHaveBeenCalled()
        expect(result).toEqual(optMessageWrapper)
    })

    it('Should not call supplier on Optional.flatMap if empty', () => {
        const supplier = jest.fn()

        const result = empty.flatMap(supplier)

        expect(result.isEmpty()).toBeTruthy()
        expect(supplier).not.toHaveBeenCalled()
    })
})
