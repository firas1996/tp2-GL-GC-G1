class APIFeatures {
  constructor(queryParams, query) {
    this.queryParams = queryParams;
    this.query = query;
  }
  filter() {
    const removeThis = ["page", "limit", "sort"];
    let querry = { ...this.queryParams };
    removeThis.forEach((el) => delete querry[el]);
    let str = JSON.stringify(querry);
    str = str.replace(/\b(lt|lte|gt|gte)\b/g, (opt) => `$${opt}`);
    this.query = this.query.find(JSON.parse(str));
    return this;
  }
  pagination() {
    const page = this.queryParams.page * 1 || 1;
    const limit = this.queryParams.limit * 1 || 5;
    const skip = (page - 1) * limit;
    if (this.queryParams.page) {
      const nbr = this.query.length;
      if (skip >= nbr) {
        res.status(400).json({
          message: "you have passed the limit",
        });
      }
    }
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
  sort() {
    if (this.queryParams.sort) {
      const sortBy = this.queryParams.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-created_at");
    }
    return this;
  }
}
