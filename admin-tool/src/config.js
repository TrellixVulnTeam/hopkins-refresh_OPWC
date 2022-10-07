const config = {
  api: {
    getProductByName: '/api/product/?partialmatch=true&friendly_name=',
    getProductByTags: '/api/product/?partialmatch=true&variations.tags=',
    getProductByCode: '/api/product/?partialmatch=true&variations.code=',
    updateProduct: '/api/product/', // *** patch
    createProduct: '/api/product/', // *** post
    deleteProduct: '/api/product/', // *** delete
    uploadImages: '/api/asset/uploadImages',
    uploadSundriesImages: '/api/asset/uploadSundriesImages',
    imagesPath: '/assets/images/products',
    sundriesImagesPath: '/assets/images/sundries',
    
    getUser: '/api/user/?partialmatch=true&',
    updateUser: '/api/user/', // *** patch
    createUser: '/api/user/', // *** post
    deleteUser: '/api/user/', // *** delete
    
    getSundries: '/api/sundries',
    createSundries: '/api/sundries',
    deleteSundries: '/api/sundries/',
    
    // *** config fragments
    getConfigDesigns: '/api/config_designs',
    // creatConfigDesign: '/api/config_designs', // TODO
    getConfigColours: '/api/config_colours',
    getConfigFabrics: '/api/config_fabrics',
  }
}

export default config;
