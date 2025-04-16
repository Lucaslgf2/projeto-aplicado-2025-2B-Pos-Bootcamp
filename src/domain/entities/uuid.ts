import { InvalidUUIDError } from './errors/invalid-uuid-error'
import { IUUID } from './types-and-enums'

export class UUID {
  public readonly value: IUUID

  constructor(uuid: string) {
    if (!this.isValid(uuid)) {
      throw new InvalidUUIDError()
    }
    this.value = uuid as IUUID
  }

  private isValid(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    return uuidRegex.test(uuid)
  }
}
