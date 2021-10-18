const config = {
  api: {
    getProductByName: '/api/product/?partialmatch=true&friendly_name=',
    getProductByTags: '/api/product/?partialmatch=true&variations.tags=',
    updateProduct: '/api/product/',
    uploadImages: '/api/asset/uploadImages',
    imagesPath: '/assets/images/products',
    
    getUser: '/api/user/?partialmatch=true&',
    updateUser: '/api/user/', // *** patch
    createUser: '/api/user/', // *** post
  }
}

export default config;
