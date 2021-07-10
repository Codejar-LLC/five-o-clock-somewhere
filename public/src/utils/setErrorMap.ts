import {FieldError} from "../generated/graphql";

export const setErrorMap = (errors : FieldError[]) => {
    const errorMap : Record<string, string> = {};
    errors.forEach(({field, message}) => {
        if (field === 'first name') {
            errorMap['first_name'] = message;
        } else if (field === 'last name') {
            errorMap['last_name'] = message;
        } else {
            errorMap[field] = message;
        }
    })

    return errorMap;
}
