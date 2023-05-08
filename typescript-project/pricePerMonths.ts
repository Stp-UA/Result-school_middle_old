// Реализовано в более расширенном варианте чем в ТЗ.
// Функция выводит массив значений месячных платежей.
// Почему?
// Дело в том что месячный платеж может быть "дробным"...
// Потому реализован следующий механизм:
// вычисляется месячный платеж и он округляется до ближайшего большего целого.
// Таким образом определяются все платежи кроме последнего.
// Последний платеж равен оставшейся невыплаченной сумме.

interface Conditions {
    price: number,
    discount: number,
    isInstallment: boolean,
    months: number
}

type TotalFunction = (condition: Conditions) => number[];

export const pricePerMonths: TotalFunction = (condition: Conditions): number[] => {
    let result: number[] = []
    const total: number = condition.price * (1 - condition.discount / 100)
    if (condition.isInstallment) {
        const price: number = Math.ceil(total / condition.months)
        const lastPrice: number = total - price * (condition.months - 1)
        for (let i: number = 1; i < condition.months; i++) {
            result.push(price)
        }
        result.push(lastPrice)
    } else {
        result.push(total)
    }
    return result
};

export const varOne: Conditions = {
    price: 100000,
    discount: 25,
    isInstallment: true,
    months: 12
}

export const varTwo: Conditions = {
    price: 100000,
    discount: 0,
    isInstallment: true,
    months: 11
}
