import Product from "@/models/Product";   
import dbConnect from "@/lib/db";
import Category from "@/models/Category";

export async function GET() {
  await dbConnect();
  return Response.json(await Product.find().populate('category'));
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  console.log(body)
  const product = new Product(body);
  await product.save();
  return Response.json(product);
}

export async function PUT(request) {
  await dbConnect();
  const body = await request.json();
  console.debug(body)
  const { _id, ...updateData } = body;
  const product = await Product.findByIdAndUpdate(_id, updateData, { new: true });

  if (!product) {
    return new Response("Product not found", { status: 404 });
  }
  return Response.json(product);
}

export async function PATCH(request) {
  await dbConnect();
  const body = await request.json();
  const { _id, ...updateData } = body;
  const product = await Product.findByIdAndUpdate(_id, updateData, { new: true });
  if (!product) {
    return new Response("Product not found", { status: 404 });
  }
  return Response.json(product);
}