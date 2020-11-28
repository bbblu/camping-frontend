export interface CommentAndBadRecord {
  comment: number;
  badRecordArray: BadRecord[];
}

export interface BadRecord {
  type: number;
  typeName: string;
  count: number;
}
