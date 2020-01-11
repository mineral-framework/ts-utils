export abstract class Optional<T> {

    public static of<T>(value: T): Optional<T> {
        if (value !== null && value !== undefined) {
            return new PresentOptional<T>(value)
        } else {
            throw new Error('Passed value is null or undefined')
        }
    }

    public static ofNullable<T>(nullable: T | null | undefined): Optional<T> {
        if (nullable !== null && nullable !== undefined) {
            return new PresentOptional<T>(nullable)
        } else {
            return new EmptyOptional<T>()
        }
    }

    public static empty<T>(): Optional<T> {
        return new EmptyOptional()
    }

    public abstract isPresent(): boolean

    public isEmpty(): boolean {
        return !this.isPresent()
    }

    public abstract get(): T
    public abstract ifPresent(consumer: (value: T) => void): void
    public abstract ifPresentOrElse(consumer: (value: T) => void, emptyAction: () => void): void
    public abstract filter(predicate: (value: T) => boolean): Optional<T>
    public abstract map<U>(mapper: (value: T) => U): Optional<U>
    public abstract flatMap<U>(mapper: (value: T) => Optional<U>): Optional<U>
    public abstract or(supplier: () => Optional<T>): Optional<T>
    public abstract orElse(another: T): T
    public abstract orElseGet(supplier: () => T): T
    public abstract orElseThrow<U>(errorSupplier: () => U): T
    public abstract orNull(): T | null

}

class EmptyOptional<T> extends Optional<T> {

    constructor() {
        super()
    }

    public isPresent(): boolean {
        return false
    }

    public get(): T {
        throw new Error('The value is not present')
    }

    public ifPresent(consumer: (value: T) => void): void {
        // Do nothing
    }

    public ifPresentOrElse(consumer: (value: T) => void, emptyAction: () => void): void {
        emptyAction()
    }

    public filter(predicate: (value: T) => boolean): Optional<T> {
        return this
    }

    public map<U>(mapper: (value: T) => U): Optional<NonNullable<U>> {
        return Optional.empty()
    }

    public flatMap<U>(mapper: (value: T) => Optional<U>): Optional<U> {
        return Optional.empty()
    }

    public or(supplier: () => Optional<T>): Optional<T> {
        return supplier()
    }

    public orElse(another: T): T {
        return another
    }

    public orElseGet(another: () => T): T {
        return this.orElse(another())
    }

    public orElseThrow<U>(exception: () => U): T {
        throw exception()
    }

    public orNull(): null {
        return null
    }

}

class PresentOptional<T> extends Optional<T> {

    private payload: T

    constructor(value: T)  {
        super()
        this.payload = value
    }

    public isPresent(): boolean {
        return true
    }

    public get(): T {
        return this.payload
    }

    public ifPresent(consumer: (value: T) => void): void {
        consumer(this.payload)
    }

    public ifPresentOrElse(consumer: (value: T) => void, emptyAction: () => void): void {
        consumer(this.payload)
    }

    public filter(predicate: (value: T) => boolean): Optional<T> {
        return (predicate(this.payload)) ? this : Optional.empty()
    }

    public map<U>(mapper: (value: T) => U): Optional<U> {
        const result: U = mapper(this.payload)
        return Optional.ofNullable(result)
    }

    public flatMap<U>(mapper: (value: T) => Optional<U>): Optional<U> {
        return mapper(this.payload)
    }

    public or(supplier: () => Optional<T>): Optional<T> {
        return this
    }

    public orElse(another: T): T {
        return this.payload
    }

    public orElseGet(supplier: () => T): T {
        return this.payload
    }

    public orElseThrow<U>(errorSupplier: () => U): T {
        return this.payload
    }

    public orNull(): T {
        return this.payload
    }

}
