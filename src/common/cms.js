import { getSesh, hasSesh, setSesh } from "./utils";
import { gql, GraphQLClient } from 'graphql-request'

const CMS_URL = `https://ap-south-1.cdn.hygraph.com/content/clren397u2pwl01wagpu0kb7r/master`;

export async function getCMSContent({name, payload, cached = true}) {
	if (cached) {
		if (payload && hasSesh(payload)) return getSesh(payload);
		if (name && hasSesh(name)) return getSesh(name);
	}
	const cmsFunction = getQuery(name);
	if (cmsFunction) {
		try {
            const client = new GraphQLClient(CMS_URL, {
                headers: {
                    authorization: `Bearer ${import.meta.env.VITE_HYGRAPH_KEY}`
                }
            })
            const response = await client.request(gql`${cmsFunction(payload)}`);
			if (response && response[name]) {
				if (cached) setSesh(payload || name, response[name]);
				return response[name];
			}
		} catch (e) {
			console.error('Unable to fetch ' + name + ' from CMS', {e});
		}
	}
	return undefined;
}

export function getQuery(name) {
	if (name === 'content') return CONTENT;
	if (name === 'project') return PROJECT;
	if (name === 'projects') return PROJECTS;
}

const CONTENT = () => `{
    content(where: {version: 1}) {
        home {
            who {
                html
            }
            what {
                html
            }
            how {
                label
                description {
                    html
                }
                image {
                    url(
                        transformation: {
                            image: {resize: {width: 800}},
                            document: {output: {format: webp}}
                        }
                    )
                }
                }
            hero {
                url(
                    transformation: {
                        document: {output: {format: webp}}
                        image: {resize: {width: 1600}}, 
                    }
                )
                background_position
            }
            insta_handle
            insta_text {
                html
            }
            insta {
                url(
                    transformation: {
                        document: {output: {format: webp}}
                        image: {resize: {width: 600}}, 
                    }
                )
            }
        }
        about {
            text {
                html
            }
            image {
                background_position
                url(
                    transformation: {
                        document: {output: {format: webp}},
                        image: {resize: {width: 800}}
                    }
                )
            }
        }
        form {
            type
            placeholder
        }
    }
}`;

const PROJECTS = () => `{
    projects(orderBy: updatedAt_DESC) {
        title
        order
        thumbnail {
            background_position
            url(
                transformation: {
                    document: {output: {format: webp}},
                    image: {resize: {width: 512}}
                }
            )
        }
        details {
            type
            location
        }
        url
    }
}`;

const PROJECT = (url) => `{
    project(where: {url: "${url}"}) {
        title
        subtitle
        description {
            html
        }
        details {
            area
            material
            completion
            location
            type
        }
        plans {
            background_position
            caption
            url(
                transformation: {
                    document: {output: {format: webp}},
                    image: {resize: {width: 1600}}
                }
            )
            jpg: url(
                transformation: {
                    document: {output: {format: jpg}},
                    image: {resize: {width: 1600}}
                }
            )
            thumb: url(
                transformation: {
                    document: {output: {format: jpg}},
                    image: {resize: {width: 200}}
                }
            )
        }
        photos {
            background_position
            caption
            url(
                transformation: {
                    document: {output: {format: webp}},
                    image: {resize: {width: 1600}}
                }
            )
            thumb: url(
                transformation: {
                    document: {output: {format: webp}},
                    image: {resize: {width: 200}}
                }
            )
        }
        banner {
            background_position
            url(
                transformation: {
                    document: {output: {format: webp}},
                    image: {resize: {width: 1600}}
                }
            )
        }   
    }
}`;