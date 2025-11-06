/**
 * Seed script that loads Payload config and uses the Payload Local API
 * to populate the database with initial data.
 *
 * Run with: pnpm seed
 */

import { getPayload } from "payload";
import config from "../payload.config.js";
import seedData from "./seed-data.json" assert { type: "json" };

type SeedData = {
  users: any[];
  experiences: any[];
  experiencePosts: any[];
  blogPosts: any[];
  pages: any[];
  socials: any[];
};

async function seed() {
  try {
    console.log("🌱 Starting database seed...\n");

    const payload = await getPayload({ config });
    const data = seedData as SeedData;

    console.log("👤 Seeding users...");
    const createdUsers = [];
    for (const user of data.users) {
      try {
        const existingUser = await payload.find({
          collection: "users",
          where: {
            email: {
              equals: user.email,
            },
          },
        });

        if (existingUser.docs.length > 0) {
          console.log(`  ⏭️  User already exists: ${user.email}`);
          createdUsers.push(existingUser.docs[0]);
          continue;
        }

        const createdUser = await payload.create({
          collection: "users",
          data: user,
        });
        createdUsers.push(createdUser);
        console.log(`  ✅ Created user: ${user.fullName} (${user.email})`);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`  ❌ Error creating user ${user.email}:`, message);
      }
    }

    console.log("\n💼 Seeding experiences...");
    const createdExperiences = [];
    for (const experience of data.experiences) {
      try {
        const existingExperience = await payload.find({
          collection: "experiences",
          where: {
            companyName: {
              equals: experience.companyName,
            },
          },
        });

        if (existingExperience.docs.length > 0) {
          console.log(
            `  ⏭️  Experience already exists: ${experience.companyName}`,
          );
          createdExperiences.push(existingExperience.docs[0]);
          continue;
        }

        const createdExperience = await payload.create({
          collection: "experiences",
          data: experience,
        });
        createdExperiences.push(createdExperience);
        console.log(`  ✅ Created experience: ${experience.companyName}`);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(
          `  ❌ Error creating experience ${experience.companyName}:`,
          message,
        );
      }
    }

    console.log("\n💼 Seeding experience posts...");
    for (const post of data.experiencePosts) {
      try {
        const existingPost = await payload.find({
          collection: "experiencePosts",
          where: {
            slug: {
              equals: post.slug,
            },
          },
        });

        let experienceId = null;
        if (post.slug.includes("studio-99")) {
          const exp = createdExperiences.find(
            (e) => e.companyName === "Studio 99",
          );
          experienceId = exp?.id;
        } else if (post.slug.includes("freelance")) {
          const exp = createdExperiences.find(
            (e) => e.companyName === "Freelance",
          );
          experienceId = exp?.id;
        }

        const postData: any = {
          ...post,
          meta: post.meta ? { ...post.meta, image: null } : { image: null },
          mainImage: null,
          experience: experienceId,
        };

        if (existingPost.docs.length > 0) {
          await payload.update({
            collection: "experiencePosts",
            id: existingPost.docs[0].id,
            data: postData,
          });
          console.log(`  🔄 Updated experience post: ${post.title}`);
        } else {
          await payload.create({
            collection: "experiencePosts",
            data: postData,
          });
          console.log(`  ✅ Created experience post: ${post.title}`);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(
          `  ❌ Error seeding experience post ${post.title}:`,
          message,
        );
      }
    }

    console.log("\n📝 Seeding blog posts...");
    for (const post of data.blogPosts) {
      try {
        const existingPost = await payload.find({
          collection: "blogPosts",
          where: {
            slug: {
              equals: post.slug,
            },
          },
        });

        const postData: any = {
          ...post,
          meta: post.meta ? { ...post.meta, image: null } : { image: null },
          mainImage: null,
          authors: createdUsers.length > 0 ? [createdUsers[0].id] : [],
        };

        if (existingPost.docs.length > 0) {
          await payload.update({
            collection: "blogPosts",
            id: existingPost.docs[0].id,
            data: postData,
          });
          console.log(`  🔄 Updated blog post: ${post.title}`);
        } else {
          await payload.create({
            collection: "blogPosts",
            data: postData,
          });
          console.log(`  ✅ Created blog post: ${post.title}`);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`  ❌ Error seeding blog post ${post.title}:`, message);
      }
    }

    console.log("\n📄 Seeding pages...");
    const allSocials = await payload.find({
      collection: "socials",
      limit: 100,
    });
    const socialIds = allSocials.docs.map((s) => s.id);

    const allExperiencePosts = await payload.find({
      collection: "experiencePosts",
      limit: 100,
    });
    const experiencePostIds = allExperiencePosts.docs.map((e) => e.id);

    for (const page of data.pages) {
      try {
        const existingPage = await payload.find({
          collection: "pages",
          where: {
            slug: {
              equals: page.slug,
            },
          },
        });

        if (existingPage.docs.length > 0) {
          const pageData: any = { ...page };
          if (pageData.content) {
            pageData.content = pageData.content.map((block: any) => {
              if (block.blockType === "MySocials") {
                return { ...block, socials: socialIds };
              }
              if (block.blockType === "Experience") {
                return { ...block, experiencePost: experiencePostIds };
              }
              return block;
            });
          }

          const updateData: any = {
            ...pageData,
            meta: pageData.meta
              ? { ...pageData.meta, image: null }
              : { image: null },
          };

          await payload.update({
            collection: "pages",
            id: existingPage.docs[0].id,
            data: updateData,
          });

          console.log(`  🔄 Updated page: ${page.title}`);
        } else {
          const pageData: any = { ...page };
          if (pageData.content) {
            pageData.content = pageData.content.map((block: any) => {
              if (block.blockType === "MySocials") {
                return { ...block, socials: socialIds };
              }
              if (block.blockType === "Experience") {
                return { ...block, experiencePost: experiencePostIds };
              }
              return block;
            });
          }

          const createData: any = {
            ...pageData,
            meta: pageData.meta
              ? { ...pageData.meta, image: null }
              : { image: null },
          };

          await payload.create({
            collection: "pages",
            data: createData,
          });

          console.log(`  ✅ Created page: ${page.title}`);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`  ❌ Error seeding page ${page.title}:`, message);
        if (error instanceof Error && "data" in error) {
          console.error(
            "  Error details:",
            JSON.stringify((error as any).data, null, 2),
          );
        }
      }
    }

    console.log("\n🔗 Seeding socials...");
    for (const social of data.socials) {
      try {
        const existingSocial = await payload.find({
          collection: "socials",
          where: {
            name: {
              equals: social.name,
            },
          },
        });

        if (existingSocial.docs.length > 0) {
          console.log(`  ⏭️  Social link already exists: ${social.label}`);
          continue;
        }

        await payload.create({
          collection: "socials",
          data: social,
        });
        console.log(`  ✅ Created social: ${social.label}`);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`  ❌ Error creating social ${social.label}:`, message);
      }
    }

    console.log("\n📋 Seeding main menu...");
    try {
      const homePage = await payload.find({
        collection: "pages",
        where: { slug: { equals: "home" } },
      });
      const blogPage = await payload.find({
        collection: "pages",
        where: { slug: { equals: "blog" } },
      });
      const experiencesPage = await payload.find({
        collection: "pages",
        where: { slug: { equals: "experiences" } },
      });
      const openSourcePage = await payload.find({
        collection: "pages",
        where: { slug: { equals: "open-source" } },
      });
      const aboutPage = await payload.find({
        collection: "pages",
        where: { slug: { equals: "about" } },
      });

      const menuData: any = {
        menuItems: [
          {
            label: "Home",
            type: "home" as const,
            external: false,
            page: homePage.docs[0]?.id || null,
          },
          {
            label: "Blog",
            type: "blog" as const,
            external: false,
            page: blogPage.docs[0]?.id || null,
          },
          {
            label: "Experiences",
            type: "experiences" as const,
            external: false,
            page: experiencesPage.docs[0]?.id || null,
          },
          {
            label: "Open Source",
            type: "lab" as const,
            external: false,
            page: openSourcePage.docs[0]?.id || null,
          },
          {
            label: "About",
            type: "other" as const,
            external: false,
            page: aboutPage.docs[0]?.id || null,
          },
        ],
      };

      await payload.updateGlobal({
        slug: "mainMenu",
        data: menuData,
      });
      console.log("  ✅ Updated main menu with page relationships");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("  ❌ Error creating main menu:", message);
    }

    console.log("\n✨ Database seeding completed successfully!\n");
  } catch (error) {
    console.error("\n❌ Error during seeding:");
    console.error(JSON.stringify(error, null, 2));
    process.exit(1);
  }

  process.exit(0);
}

await seed();
