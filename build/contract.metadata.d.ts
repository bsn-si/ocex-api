declare const _default: {
    source: {
        hash: string;
        language: string;
        compiler: string;
    };
    contract: {
        name: string;
        version: string;
        authors: string[];
    };
    V3: {
        spec: {
            constructors: {
                args: {
                    label: string;
                    type: {
                        displayName: string[];
                        type: number;
                    };
                }[];
                docs: string[];
                label: string;
                payable: boolean;
                selector: string;
            }[];
            docs: any[];
            events: any[];
            messages: {
                args: {
                    label: string;
                    type: {
                        displayName: string[];
                        type: number;
                    };
                }[];
                docs: string[];
                label: string;
                mutates: boolean;
                payable: boolean;
                returnType: {
                    displayName: string[];
                    type: number;
                };
                selector: string;
            }[];
        };
        storage: {
            struct: {
                fields: {
                    layout: {
                        cell: {
                            key: string;
                            ty: number;
                        };
                    };
                    name: string;
                }[];
            };
        };
        types: ({
            id: number;
            type: {
                def: {
                    composite: {
                        fields: {
                            name: string;
                            type: number;
                            typeName: string;
                        }[];
                    };
                    array?: undefined;
                    primitive?: undefined;
                    variant?: undefined;
                    tuple?: undefined;
                };
                params: {
                    name: string;
                    type: number;
                }[];
                path: string[];
            };
        } | {
            id: number;
            type: {
                def: {
                    composite: {
                        fields: {
                            type: number;
                            typeName: string;
                        }[];
                    };
                    array?: undefined;
                    primitive?: undefined;
                    variant?: undefined;
                    tuple?: undefined;
                };
                path: string[];
                params?: undefined;
            };
        } | {
            id: number;
            type: {
                def: {
                    array: {
                        len: number;
                        type: number;
                    };
                    composite?: undefined;
                    primitive?: undefined;
                    variant?: undefined;
                    tuple?: undefined;
                };
                params?: undefined;
                path?: undefined;
            };
        } | {
            id: number;
            type: {
                def: {
                    primitive: string;
                    composite?: undefined;
                    array?: undefined;
                    variant?: undefined;
                    tuple?: undefined;
                };
                params?: undefined;
                path?: undefined;
            };
        } | {
            id: number;
            type: {
                def: {
                    variant: {
                        variants: {
                            index: number;
                            name: string;
                        }[];
                    };
                    composite?: undefined;
                    array?: undefined;
                    primitive?: undefined;
                    tuple?: undefined;
                };
                path: string[];
                params?: undefined;
            };
        } | {
            id: number;
            type: {
                def: {
                    variant: {
                        variants: ({
                            index: number;
                            name: string;
                            fields?: undefined;
                        } | {
                            fields: {
                                type: number;
                            }[];
                            index: number;
                            name: string;
                        })[];
                    };
                    composite?: undefined;
                    array?: undefined;
                    primitive?: undefined;
                    tuple?: undefined;
                };
                params: {
                    name: string;
                    type: number;
                }[];
                path: string[];
            };
        } | {
            id: number;
            type: {
                def: {
                    composite: {
                        fields: {
                            name: string;
                            type: number;
                            typeName: string;
                        }[];
                    };
                    array?: undefined;
                    primitive?: undefined;
                    variant?: undefined;
                    tuple?: undefined;
                };
                path: string[];
                params?: undefined;
            };
        } | {
            id: number;
            type: {
                def: {
                    tuple: number[];
                    composite?: undefined;
                    array?: undefined;
                    primitive?: undefined;
                    variant?: undefined;
                };
                params?: undefined;
                path?: undefined;
            };
        })[];
    };
};
export default _default;
