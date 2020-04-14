<style scoped>
    .expand-row {
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row>
            <Col span="6">
                <span class="expand-key">UserName: </span>
                <span class="expand-value">{{ row.UserName }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">AuthType: </span>
                <span class="expand-value">{{ row.AuthType }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">Password: </span>
                <span class="expand-value">{{ row.Password }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">AuthKey: </span>
                <span class="expand-value">{{ row.AuthKey }}</span>
            </Col>
        </Row>
    </div>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line

export default {
    props: {
        row: Object
    }
}
</script>