import Heap from "heap";
import { isPrimitive, NonFunctionKeys, PickByValue, PickByValueExact, Primitive, RequiredKeys } from 'utility-types';

type InputType<T> = T extends number ? { values: number[], key?: never } : { values: T[], key: keyof T };
type Result<T> = {
    A: T[];
    ASum: number;
    B: T[];
    BSum: number;
    distance: number;
}

// greedy heuristic
export const greedy = <T>({ values, key }: InputType<T>) => {
    const result: Result<T> = {
        A: [],
        ASum: 0,
        B: [],
        BSum: 0,
        distance: 0
    };
    if (values.length == 0) return result;

    const todo: { payload: number | T, node: number }[] = [];

    values.forEach((i) => {
        const node = !!key && typeof i !== "number" ? i[key] : i;

        if (typeof node !== "number") throw new Error(`kk_greedy: key ${String(key)} must refer to a number, found ${typeof node}`);

        todo.push({
            node,
            payload: i,
        });
    });

    todo.sort((a, b) => { return b.node - a.node; });

    todo.forEach((i) => {
        if (result.ASum < result.BSum) {
            result.A.push(i.payload as T);
            result.ASum += i.node;
        } else {
            result.B.push(i.payload as T);
            result.BSum += i.node;
        }
    });

    result.distance = Math.abs(result.ASum - result.BSum);

    return result;
}



type HeapNode<T> = {
    node: number;
    value: number;
    children: HeapNode<T>[];
    payload: number | T;
}

// least differencing method heuristic
export const LDM = <T>({ values, key }: InputType<T>) => {

    var result: Result<T> = {
        A: [],
        ASum: 0,
        B: [],
        BSum: 0,
        distance: 0
    };
    if (values.length == 0) return result;
    // Heap setting to return maximums, based on heap value then node
    var heap = new Heap((a: HeapNode<T>, b: HeapNode<T>) => {
        if (a.value === b.value) {
            return b.node - a.node;
        }
        return b.value - a.value;
    });

    values.forEach((i) => {
        const starting_value = !!key && typeof i !== "number" ? i[key] : i;

        if (typeof starting_value !== "number") throw new Error(`kk_greedy: key ${String(key)} must refer to a number, found ${typeof starting_value}`);

        heap.push({
            value: starting_value,
            node: starting_value,
            children: [],
            payload: i,
        });
    });

    console.debug(heap);

    while (heap.size() > 1) {
        kk_iterate(heap);
    }

    const peek = heap.peek();
    if (!peek) throw new Error("kk_greedy: heap must have at least two elements");
    kk_traverse(peek, result, 0);
    result.distance = peek.value;
    return result;
}

////////////////////

const kk_iterate = <T>(heap: Heap<HeapNode<T>>) => {
    var a = heap.pop();
    var b = heap.pop();

    if (!a || !b) throw new Error("kk_iterate: heap must have at least two elements");

    a.value = a.value - b.value;
    a.children = a.children.concat(b);
    heap.push(a);

    console.debug('kk_iterate, heap: ', heap);
};

const kk_traverse = <T>(node: HeapNode<T>, result: Result<T>, level = 0) => {
    if (level % 2) {
        result.A.push(node.payload as T);
        result.ASum += node.node;
    } else {
        result.B.push(node.payload as T);
        result.BSum += node.node;
    }

    level++;

    node.children.forEach((child) => {
        kk_traverse(child, result, level);
    });
};

export default {
    greedy,
    LDM,
}
