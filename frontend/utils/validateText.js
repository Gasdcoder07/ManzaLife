import { Filter } from "bad-words"

const filter = new Filter()

const validateText = (text) => {
  return filter.isProfane(text)
}

export default validateText
