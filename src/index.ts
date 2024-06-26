import Heap from "heap-js";

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
    const todo = values.map((payload) => {
        const node: number = !!key && typeof payload !== "number" ? payload[key] as unknown as number : payload as number;

        return { payload, node };
    }).sort((a, b) => { return b.node - a.node; });

    const result = todo.reduce((previous, current) => {
        if (previous.ASum < previous.BSum) {
            previous.A.push(current.payload as T);
            previous.ASum += current.node;
        } else {
            previous.B.push(current.payload as T);
            previous.BSum += current.node;
        }
        previous.distance = Math.abs(previous.ASum - previous.BSum);
        return previous;
    }, {
        A: Array<T>(0),
        ASum: 0,
        B: Array<T>(0),
        BSum: 0,
        distance: 0
    })

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

    // Heap setting to return maximums, based on heap value then node
    var heap = new Heap((a: HeapNode<T>, b: HeapNode<T>) => {
        if (a.value === b.value) {
            return b.node - a.node;
        }
        return b.value - a.value;
    });

    values.map((payload) => {
        const node = !!key && typeof payload !== "number" ? payload[key] as unknown as number : payload as number;

        heap.push({
            value: node,
            node,
            children: [],
            payload,
        });
    });

    while (heap.size() > 1) {
        kk_iterate(heap);
    }

    const peek: HeapNode<T> = heap.peek()!;
    kk_traverse(peek, result, 0);
    result.distance = peek.value;
    return result;
}

const kk_iterate = <T>(heap: Heap<HeapNode<T>>) => {
    var a = heap.pop()!;
    var b = heap.pop()!;

    a.value = a.value - b.value;
    a.children = a.children.concat(b);
    heap.push(a);
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
