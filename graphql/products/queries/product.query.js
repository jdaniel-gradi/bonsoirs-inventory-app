const { gql } = require("graphql-request");

const getProductById = gql`
    query product($id: ID!) {
        product(id: $id) {
            id
            handle
            title
            description
            tags
        }
    }
`;

const getProductByHandle = gql`
    query productByHandle($handle: String!) {
        productByHandle(handle: $handle) {
            id
            handle
            title
            description
            tags
        }
    }
`;

const getVariantBySKU = gql`
    query productVariants($sku: String!) {
        productVariants(first: 5, query: $sku) {
            edges {
                node {
                    id
                    sku
                    title
                    inventoryItem {
                        id
                        inventoryLevels {
                            edges {
                                node {
                                    id
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

module.exports = { getProductById, getProductByHandle, getVariantBySKU };
