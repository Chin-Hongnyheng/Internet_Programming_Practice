import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';
import { ProductType } from '../types/product.type';
import { CreateProductInput } from '../inputs/create-product.input';
import { ProductService } from '../../product/product.service';
import { CategoryService } from '../../category/category.service';
import { CategoryType } from '../types/category.type';

@Resolver(() => ProductType)
export class ProductCodeFirstResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  @Query(() => [ProductType])
  products() {
    return this.productService.findAll();
  }

  @Query(() => ProductType, { nullable: true })
  product(
    @Args('id', { type: () => ID }) id: number,
  ) {
    // 🔑 convert number → string
    return this.productService.findOne(String(id));
  }

  @Mutation(() => ProductType)
  createProduct(
    @Args('input', { type: () => CreateProductInput })
    input: CreateProductInput,
  ) {
    return this.productService.create({
      ...input,
      categoryId: String(input.categoryId),
    });
  }

  @ResolveField(() => CategoryType, { nullable: true })
  category(@Parent() product: ProductType) {
    return this.categoryService.findOne(String(product.categoryId));
  }
}
