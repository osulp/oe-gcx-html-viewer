declare module geocortex.core.documents {
    interface Author {
        globalId?: string;
        title?: string;
        description?: string;
        issuerTitle?: string;
        culture?: string;
    }
    interface BatchRequest {
        action?: string;
        id?: string;
        globalId?: string;
        streamId?: string;
        searchClause?: string;
        createOnly?: boolean;
        modify?: boolean;
        throwIfMissing?: boolean;
        startPosition?: number;
        document?: Document;
        moniker?: Moniker;
        content?: DocumentContent;
        documentQuery?: Query<Document>;
        monikerQuery?: Query<Moniker>;
        documentAccess?: GrantSet<Document>;
        monikerAccess?: GrantSet<Moniker>;
        matchingDocuments?: ResultSet<Document>;
        matchingMonikers?: ResultSet<Moniker>;
        monikers?: Moniker[];
        status?: boolean;
        error?: Exception;
        bulkRequest?: BulkRequest;
        bulkResponse?: BulkRequest;
        request?: BatchRequest;
        response?: BatchRequest;
        scrubOptions?: ScrubOptions;
        scrubMetrics?: ScrubMetrics;
        format?: string;
        count?: number;
        link?: string;
    }
    interface BooleanSet<T> {
        /** The required list of items. */
        require?: T[];
        /** The excluded list of items. */
        exclude?: T[];
        /**  The included list of items. */
        include?: T[];
    }
    interface BulkRequest {
        [name: string]: BatchRequest[];
    }
    interface Claim {
        type?: string;
        value?: string;
        valueType?: string;
        issuer?: string;
        originalIssuer?: string;
        properties?: PropertySet;
        token?: string;
    }
    interface Document extends TEntity {
        /** The entity identifier. */
        entityId?: string;
        /** The length of the content entity. */
        entityLength?: number;
        /** The length of the content chunks. */
        entityChunkSize?: number;
        /** The time at which the document was last accessed. */
        timeOfLastAccess?: Date | number;
        /** The time at which the document was last modified. */
        timeOfLastModification?: Date | number;
        /** The time of creation. */
        timeOfCreation?: Date | number;
        /** The content type of the document content. */
        contentType?: string;
        /** The file type of the document. */
        fileType?: string;
        /** The author of the document. */
        author?: Author;
        /** The editor of the document. */
        editor?: Author;
        /** The tags for the document. Tags should be unique. */
        tags?: string[];
    }
    interface DocumentContent {
        /** The document meta data. */
        document?: Document;
        /** The BLOB. */
        blob?: any;
        /** The text. */
        text?: string;
        /** The JSON content. */
        json?: Object;
        /** The XML content. */
        xml?: any;
    }
    interface EntityAccess {
        /** Whether or not the entity metadata can be changed. */
        change?: boolean;
        /** Whether or not the entity can be created. */
        create?: boolean;
        /** Whether or not the entity content can be edited. */
        edit?: boolean;
        /** Whether or not the entity can be viewed. */
        view?: boolean;
        /** The IDs of the monikers this access was calculated for. */
        monikerIds: string[];
    }
    interface Exception {
        code?: number;
        id?: string;
        formalCode?: string;
        formalMessage?: string;
        message?: string;
        type?: string;
    }
    interface Filter {
        field?: string;
        method?: string;
        boost?: number;
        culture?: string;
        range?: QualifiedValue[];
    }
    interface Grant {
        assert?: boolean;
        revoke?: boolean;
        kind?: string;
        globalId?: string;
        subject?: Moniker;
        token?: string;
    }
    interface GrantSet<TSubject> {
        actors?: Moniker[];
        subjects?: TSubject[];
    }
    interface Moniker extends TEntity {
        name?: string;
        kind?: string;
        service?: Claim;
        subject?: Claim;
        claims?: Claim[];
        aliases?: string[];
    }
    interface PropertySet {
        [name: string]: QualifiedValue;
    }
    interface QualifiedValue {
        boolean?: boolean;
        date?: string | number;
        double?: number;
        long?: number;
        null?: boolean;
        shape?: Shape;
        string?: string;
    }
    interface Query<TEntity> {
        affinity?: number;
        boost?: number;
        start?: number;
        limit?: number;
        score?: boolean;
        examples?: BooleanSet<TEntity>;
        filters?: BooleanSet<Filter>;
        queries?: BooleanSet<Query<TEntity>>;
        sort?: string[];
        sortDescending?: string[];
    }
    interface Result<TEntity> {
        entity?: TEntity;
        score?: number;
        highlights?: TextRegion[];
    }
    interface ResultSet<TEntity> {
        query?: Query<TEntity>;
        start?: number;
        total?: number;
        results?: Result<TEntity>[];
    }
    interface ScrubMetrics {
        chunksPurged?: number;
        documentsPurged?: number;
        monikersPurged?: number;
        spaceReclaimed?: number;
        passes?: number;
    }
    interface ScrubOptions {
        purgeLimit?: number;
        createdBefore?: string | number;
        updatedBefore?: string | number;
        deletedBefore?: string | number;
        expiredBefore?: string | number;
        resumedBefore?: string | number;
        nsPrefix?: string;
    }
    interface Shape {
        type?: string;
        orientation?: string;
        coordinates?: ShapeData;
        geometries?: Shape[];
        radius?: string;
    }
    interface ShapeData extends Array<ShapeData | number> {
    }
    interface TEntity {
        /** Whether or not this entity represents a created item. */
        created?: boolean;
        /** Whether or not this entity represents a deleted item. */
        deleted?: boolean;
        /** Whether or not this entity represents an item that expires. */
        expires?: boolean;
        /** The entity identifier. */
        id?: string;
        /** The entity global identifier. */
        globalId?: string;
        /** The entity change identifier. */
        changeId?: string;
        /** The entity expiry identifier. */
        expiryId?: string;
        /** The title of the entity. */
        title?: string;
        /** The description of the entity. */
        description?: string;
        /** The issuer title of the entity. */
        issuerTitle?: string;
        /** The time of deletion. */
        timeOfDeletion?: Date | number;
        /** The time of expiration. */
        timeOfExpiration?: Date | number;
        /** The culture of the entity. */
        culture?: string;
        /** The version of the entity. */
        version?: string;
        /** The list of grants which determine which users or groups have access privilege to this entity. */
        grants?: Grant[];
        /** The shapes of the entity. */
        shape?: Shape;
        /** The thumbnail image of the entity. */
        thumbnail?: Thumbnail;
        /** The custom properties of the entity. */
        properties?: PropertySet;
        /** The access privilege that the current user has for this entity. */
        access?: EntityAccess;
        /** The list of fields to update when updating the entity. Otherwise all fields will be updated. */
        updates?: string[];
    }
    interface TextRegion {
        field?: string;
        source?: string;
        vectors?: number[];
    }
    interface Thumbnail {
        blob?: string;
        text?: string;
        contentType?: string;
        location?: string;
    }
}
declare module geocortex.core.documents.results {
    interface CloneDocumentResult {
        document: Document;
    }
    interface CreateDocumentResult {
        document: Document;
    }
    interface CreateMonikerResult {
        moniker: Moniker;
    }
    interface DeleteDocumentResult {
        document: Document;
    }
    interface DeleteMonikerResult {
        moniker: Moniker;
    }
    interface GenerateLinksResult {
        links: string[];
    }
    interface ModifyDocumentResult {
        document: Document;
    }
    interface OpenDocumentResult {
        document: Document;
    }
    interface PeekDocumentAccessResult {
        documentAccess: GrantSet<Document>;
    }
    interface PeekDocumentResult {
        document: Document;
    }
    interface PeekMonikerAccessResult {
        monikerAccess: GrantSet<Moniker>;
    }
    interface PeekMonikerResult {
        moniker: Moniker;
    }
    interface PerformBulkResult {
        bulkResponse: BulkRequest;
    }
    interface PerformResult {
        response: BatchRequest;
    }
    interface PreviewDocumentResult {
        document: Document;
    }
    interface PreviewMonikerResult {
        moniker: Moniker;
    }
    interface ReadDocumentResult {
        content: DocumentContent;
    }
    interface RestoreDocumentResult {
        document: Document;
    }
    interface RestoreMonikerResult {
        moniker: Moniker;
    }
    interface ResumeDocumentResult {
        document: Document;
    }
    interface ScrubResult {
        scrubMetrics: ScrubMetrics;
    }
    interface SearchDocumentsResult {
        matchingDocuments: ResultSet<Document>;
    }
    interface SearchMonikersResult {
        matchingMonikers: ResultSet<Moniker>;
    }
    interface SearchUsersOrRolesResult {
        monikers: Moniker[];
    }
    interface SelfResult {
        monikers: Moniker[];
    }
    interface TouchDocumentResult {
        document: Document;
    }
    interface UpdateDocumentResult {
        document: Document;
    }
    interface UpdateMonikerResult {
        moniker: Moniker;
    }
    interface WriteDocumentResult {
        document: Document;
    }
}