<template>
    <div>
        <heading />

        <!--  -->
        <grid :column="2" :title="`Lorem Ipsum`" push>
            <div class="grid__i">
                <p
                    v-text="
                        `Lorem ipsum dolor sit amet, consectetur adipisicing elit.Natus, corrupti maiores inventore rem laboriosam expeditablanditiis ab assumenda autem alias.`
                    "
                />
            </div>

            <div class="grid__i">
                <p
                    v-text="
                        `Lorem ipsum dolor sit amet, consectetur adipisicing elit.Natus, corrupti maiores inventore rem laboriosam expeditablanditiis ab assumenda autem alias.`
                    "
                />
            </div>
        </grid>

        <!--  -->
        <grid :column="4" :title="`Lorem Ipsum`">
            <div class="grid__i">
                <p
                    v-text="
                        `Lorem ipsum dolor sit amet, consectetur adipisicing elit.Natus, corrupti maiores inventore rem laboriosam expeditablanditiis ab assumenda autem alias.`
                    "
                />
            </div>

            <div class="grid__i">
                <p
                    v-text="
                        `Lorem ipsum dolor sit amet, consectetur adipisicing elit.Natus, corrupti maiores inventore rem laboriosam expeditablanditiis ab assumenda autem alias.`
                    "
                />
            </div>

            <div class="grid__i">
                <p
                    v-text="
                        `Lorem ipsum dolor sit amet, consectetur adipisicing elit.Natus, corrupti maiores inventore rem laboriosam expeditablanditiis ab assumenda autem alias.`
                    "
                />
            </div>

            <div class="grid__i">
                <p
                    v-text="
                        `Lorem ipsum dolor sit amet, consectetur adipisicing elit.Natus, corrupti maiores inventore rem laboriosam expeditablanditiis ab assumenda autem alias.`
                    "
                />
            </div>
        </grid>

        <!--  -->
        <grid :column="2" :title="`Lorem Ipsum`">
            <div class="grid__i">
                <p
                    v-text="
                        `Lorem ipsum dolor sit amet, consectetur adipisicing elit.Natus, corrupti maiores inventore rem laboriosam expeditablanditiis ab assumenda autem alias.`
                    "
                />
            </div>

            <div class="grid__i">
                <p
                    v-text="
                        `Lorem ipsum dolor sit amet, consectetur adipisicing elit.Natus, corrupti maiores inventore rem laboriosam expeditablanditiis ab assumenda autem alias.`
                    "
                />
            </div>
        </grid>
    </div>
</template>

<script>
export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
