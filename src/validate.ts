import { z } from "zod";

const schema = createSchema(z.object({ animal: z.object({}) }));

function createSchema(d: any) {
  console.log(d);
}

const textSchema = z.object({ "#text": z.string() });
const attributeSchema = z.record(z.string().startsWith("@_"), z.string());
const baseNodeWithAttributeSchema = textSchema.merge(attributeSchema);
const baseNodeSchema = z.record(z.string(), z.string()).or(textSchema);

const baseCategorySchema = z.object({
  name: z.string(),
});

type Category = z.infer<typeof baseCategorySchema> & {
  subcategories: Category[];
};

const categorySchema: z.ZodType<Category> = baseCategorySchema.extend({
  subcategories: z.lazy(() => categorySchema.array()),
});

type ParsedXml<T> = {
  [Key in keyof T]: Key extends "#text"
    ? string
    : Key extends `@_${string}`
    ? string
    : Key extends string
    ? string | ParsedXml<T[Key]>
    : never;
};

const x = { "#text": "foo", "@_foo": 3 };
console.log(x);
type X = ParsedXml<typeof x>;
