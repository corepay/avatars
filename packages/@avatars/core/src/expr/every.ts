import type { IExpr as IExprBase, IExprResolved, IExprContext } from '../expr';

export type IExprArgs<O> = [Array<IExprBase<O, boolean>>];
export type IExpr<O> = ['$every', IExprArgs<O>];

export function create<O>(...args: IExprArgs<O>): IExpr<O> {
  return ['$every', args];
}

export function resolve<O>(context: IExprContext<O>, args: IExprArgs<O>): IExprResolved<IExpr<O>> {
  if (Array.isArray(args[0])) {
    return args[0].every((v) => context.resolve(v));
  }

  throw new Error('Invalid arguments for $every.');
}
